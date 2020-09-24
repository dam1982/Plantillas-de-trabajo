import { Component, OnInit, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { EnlistmentBoxes } from 'src/app/model/enlistment-boxes';
import { EnlistmentOrderBusinessService } from 'src/app/business/warehouse/enlistment-order-business.service';
import Swal from 'sweetalert2';

import { ProductFilter } from 'src/app/model/product-filter';
import { NgForm } from '@angular/forms';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
@Component({
  selector: 'app-enlistment-order',
  templateUrl: './enlistment-order.component.html',
  styleUrls: ['./enlistment-order.component.scss']
})
export class EnlistmentOrderComponent implements OnInit {

  @Output() finishEvent = new EventEmitter<boolean>();
  gridMapper: GridMapper<EnlistmentBoxes>;
  products: ProductFilter[];
  @ViewChild('EnlismentForm', { static: false }) EnlismentForm: NgForm;
  onActionBoxes: boolean = false;
  onActionProducts: boolean = false;
  onActiveSave: boolean = false;
  clickedConsult: boolean = false;
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(private businessOrder: EnlistmentOrderBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
  }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'BoxNumber', maxWidth: 100, name: "Caja" },
      { prop: 'PalletNumber', maxWidth: 100, name: 'Estiba' },
      { prop: 'LocationName', maxWidth: 150, name: 'Ubicación', canAutoResize: true },
      { prop: 'Observations', name: 'Estado Caja' }
    ];
  }


  LoadComponent() {

    this.EnlismentForm.form.markAsUntouched();
    this.clickedConsult = false;
    if (this.businessOrder.CurrentEnlistment.EnlistmentNumber) {
      this.GetProducts(this.businessOrder.CurrentEnlistment.OrderNumber);
    } else {
      this.products = [];
    }
  }

  ValidationBoxes(boxes: string) {
    this.EnlismentForm.form.markAllAsTouched();

    if (this.EnlismentForm.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido. Por favor complete los campos requeridos (*)", 10, ToastyType.error, true);
      return false;
    }
    try {
      this.businessOrder.CurrentEnlistment.ValidationBoxesNumber(boxes);
      this.onActionBoxes = true;
      this.GetBoxes(this.businessOrder.CurrentEnlistment);
    } catch (error) {
      Swal.fire('Formato incorrecto de caja(s)', error, 'warning');
    }

  }

  GetProducts(orderNumber: any) {

    if (orderNumber === "" || orderNumber === undefined) {
      this.toast.AddToast("Advertencia", "Por favor ingrese un numero de orden para buscar los productos.", 10, ToastyType.warning, true);
      return;
    }

    this.onActionProducts = true;
    this.businessOrder.GetProducts(orderNumber).then(x => {
      if (x.length == 0) {
        this.businessOrder.CurrentEnlistment.ProductCode = "";
        this.businessOrder.CurrentEnlistment.ProductName = "";
        this.toast.AddToast("Advertencia", "No se encontraron productos asociados al numero de orden.", 10, ToastyType.warning, true);
        return;
      }
      this.products = x;
      this.toast.AddToast("Éxito", "Se encotraron " + x.length + " productos.", 10, ToastyType.success, true);
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionProducts = false;
    });
  }

  GetBoxes(filters: any) {
    this.businessOrder.GetBoxes(filters).then(x => {
      this.businessOrder.CurrentEnlistment.Boxes = x;
      this.clickedConsult = true;
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionBoxes = false;
    })
  }

  SaveEnlisment() {
    if (!this.clickedConsult) {
      this.toast.AddToast("Advertencia", "Debe consultar primero antes de guardar.", 10, ToastyType.warning, true);
      return;
    }
    this.onActiveSave = true;
    this.businessOrder.SaveEnlistment(this.businessOrder.CurrentEnlistment).then(x => {
      if (x.EnlistmentNumber > -1) {
        this.toast.AddToast("Correcto", "Alistamiento Guardado", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Correcto", "No se pudo guardar el alistamiento. Verifique las observaciones de las cajas.", 10, ToastyType.success, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActiveSave = false;
    });
  }

  Finish() {
    this.EnlismentForm.form.markAsUntouched();
    this.modalWindow.hide();
    this.clickedConsult = false;
    this.finishEvent.emit(true);
  }

}
