import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalTagBusinessService } from 'src/app/business/tags/external-tag-business.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';

@Component({
  selector: 'app-external-tag',
  templateUrl: './external-tag.component.html',
  styleUrls: ['./external-tag.component.scss']
})
export class ExternalTagComponent implements OnInit {

  rePrintCheck: boolean = false;
  internalTagText: string = "";
  externalTagText: string = "";
  internalTags: number[] = [];
  onAction: boolean = false;
  orderId?: number;
  rePrint: boolean = false;
  operation: string;
  authorizationUserId = 0;

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(public business: ExternalTagBusinessService, private router: Router, private toast: ToastService) {
    this.rePrint = AppEnviroment.User.Profile.Permissions.indexOf("RePrintExtTag") != -1;
  }

  ngOnInit() {
    this.business.ValidateConfirmation().then(validateConfirm => {
      if (!validateConfirm.Confirmed) {
        Swal.fire({ title: "Error", html: `Existen etiquetas sin confirmar para el producto ${validateConfirm.ProductName} <br>Lote: ${validateConfirm.Batch}<br>Orden: ${validateConfirm.OrderNumber}<br>Caja nro: ${validateConfirm.BoxNumber}`, type: 'error', showCloseButton: true });
        this.business.ExternalTagCode = validateConfirm.Tag;
        return;
      }
    }).catch(x => {
      Swal.fire("Error", x.message, 'error'); 
    });
  }


  async AddInternalTag() {

    var values = (this.internalTagText).split('!');
    try {
      if (values.length != 2)
        throw new Error("La etiqueta ingresada no tiene un formato válido");

      if (!this.orderId)
        this.orderId = Number(values[1]);
      else if (Number(values[1]) != this.orderId)
        throw new Error("La etiqueta ingresada tiene una orden diferente a la orden del resto de etiquetas.");

      if (this.internalTags.indexOf(Number(values[0])) > 0)
        throw new Error("La etiqueta ingresada ya fue leída.");

      
      if (this.internalTags.length > 0 && Number(values[0]) != this.internalTags[0] - 1 && Number(values[0]) != this.internalTags[this.internalTags.length - 1] + 1) {
        Swal.fire({
          title: "Confirmar Acción",
          text: "¿Los paquetes no son consecutivos, desea volver a realizar la lectura?",
          type: 'warning',
          confirmButtonText: 'Si',
          cancelButtonText: 'No, pedir autorización',
          showCloseButton: false,
          showCancelButton: true
        }).then((confirm) => {

          if (!confirm.dismiss) {
            this.internalTagText = "";
            return;
          }
          this.operation = "AddInternalTag";
          this.internalTagText = values[0];
          this.modalWindow.show();

        });
      } else {
        this.SaveTag(Number(values[0]));
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        type: 'error',
        showCloseButton: true,
      });
      this.internalTagText = "";
    }
  }

  SaveTag(value: number) {
    this.internalTags.push(value);
    this.internalTags = this.internalTags.sort();
    this.internalTagText = "";
  }

  ValidateTags() {
    this.onAction = true;

    this.business.ValidateQuantityPackageByBox(this.orderId, this.internalTags).then(x => {

      if (x == true) {
        this.SaveTags();
      } else {
        Swal.fire({
          title: "Confirmación",
          text: "La cantidad de paquetes por caja no corresponde al configurado, desea generar la etiqueta de todas maneras? ",
          type: 'warning',
          showCloseButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "No",
          showCancelButton: true
        }).then((willDelete) => {
          if (willDelete.dismiss)
            return;
          this.SaveTags();
        });
      }

    }).catch(x => {
      Swal.fire("Error", x.message, 'error');
    }).finally(() => this.onAction = false);
  }

  SaveTags() {
    this.onAction = true;
    this.business.SaveTags(this.orderId, this.internalTags, this.rePrintCheck, this.authorizationUserId).then(x => {
      if (x != "")
        this.toast.AddToast("Información", "Etiqueta generada con éxito, por favor confirmar etiqueta.", 10, ToastyType.success, true);
      else {
        Swal.fire({
          title: "Confirmar Acción",
          text: "Los paquetes no son consecutivos, se requiere autorización de calidad para continuar.",
          type: 'warning',
          confirmButtonText: 'Si, pedir autorización',
          cancelButtonText: 'Cancelar',
          showCloseButton: false,
          showCancelButton: true
        }).then((confirm) => {         
          if (confirm.dismiss) {
            return;
          }
          this.operation = "SaveTags";
          this.modalWindow.show();
        });
      }

    }).catch(x => {
      Swal.fire("Error", x.message, 'error');
      this.Reprint();
    }).finally(() => {
      this.onAction = false;
    });
  }

  Cancel() {
    Swal.fire({
      title: "Confirmar Acción",
      text: "Se dispone a cancelar, las lecturas realizadas se perderán, está seguro?",
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss)
        return;
      this.Reset();

    });
  }

  ConfirmExternalTag() {
    if (!this.externalTagText)
      Swal.fire({
        title: "Error",
        text: "Debe ingresar el código de etiqueta externa.",
        type: 'error',
        showCloseButton: true,
      });
    this.onAction = true;
    this.business.ConfirmExternalTag(this.externalTagText).then(x => {
      this.Reset();
      this.toast.AddToast("Información", "Etiqueta externa confirmada con éxito!!.", 10, ToastyType.success, true);
    }).catch(x => {
      Swal.fire("Error", x.message, 'error');
    }).finally(() => {
      this.onAction = false;
    });
  }

  AddExternalTag(event) {

    if (event.key === "Enter") {
      this.ConfirmExternalTag();
    }
  }

  Reprint() {
    this.business.ExternalTagCode = null;
    this.Reset();
  }

  Reset() {

    this.internalTags = [];
    this.internalTagText = null;
    this.externalTagText = null;
    this.orderId = null;
    this.authorizationUserId = 0;
  }

  CloseModal(event) {
    if (event > 0) {
      this.authorizationUserId = event
      switch (this.operation) {
        case "AddInternalTag":
          this.SaveTag(Number(this.internalTagText));
          break;
        case "SaveTags":
          this.SaveTags();
          break;
        default:
          break;
      }


    } else {
      this.internalTagText = null;
      this.toast.AddToast("Información", "No existe autorización de calidad.", 10, ToastyType.warning, true);
    }
    this.modalWindow.hide();
  }

}
