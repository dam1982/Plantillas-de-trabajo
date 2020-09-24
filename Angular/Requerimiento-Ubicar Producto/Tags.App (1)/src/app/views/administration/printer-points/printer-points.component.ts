import { Component, OnInit, ViewChild } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { AdminPrinterPointsBusinessService } from 'src/app/business/administration/admin-printer-points-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { PrinterPoint } from 'src/app/model/printer-point';
import { NgForm } from '@angular/forms';
import { TagType } from 'src/app/model/tag-type';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Printer } from 'src/app/model/printer';
import { User } from 'src/app/model/user';
import { DualListComponent } from 'angular-dual-listbox';

@Component({
  selector: 'app-printer-points',
  templateUrl: './printer-points.component.html',
  styleUrls: ['./printer-points.component.scss']
})
export class PrinterPointsComponent implements OnInit {

  gridMapper: GridMapper<PrinterPoint>;
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('PrinterPointForm', { static: false }) PrinterPointForm: NgForm;
  onActionSave: boolean = false;

  tagTypes: Object[];
  templates: Object[];
  printers: Printer[];
  users: Array<any>;
  usersConfirmed: Array<any>;
  format: any = {
    add: "Agregar",
    remove: "Remover",
    all: "Todos",
    none: "Ninguno",
    direction: "left-to-right",
    draggable: true,
    locale: undefined
  };

  constructor(private business: AdminPrinterPointsBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.usersConfirmed = new Array<Object>();
  }

  ngOnInit() {

    this.gridMapper.Columns = [
      { prop: 'Code', name: "Código", maxWidth: 100 },
      { prop: 'Name', name: "Nombre", minWidth: 300 },
      { prop: 'Printer.Name', name: 'Impresora', minWidth: 300 },
      { prop: 'TagType.Name', name: 'Tipo Etiqueta', maxWidth: 180 },
      { prop: 'Template.Name', name: "Plantilla Impresión", canAutoResize: true }
    ];

    this.GetPrinterPoints();
    this.fillFields();
  }

  fillFields() {
    this.business.GetTagTypes().then(x => {
      this.tagTypes = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
    this.business.GetTemplates().then(x => {
      this.templates = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
    this.business.GetPrinters().then(x => {
      this.printers = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
    this.business.GetUsers().then(x => {
      this.users = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

  }


  EditPrinterPoint(isNew) {
    if (isNew) {
      this.business.resetCurrentPrinterPoint();
      this.OpenModal();
    } else {
      if (this.gridMapper.SelectedRows.length == 0)
        return;

      this.modalWindow.title = 'Editar Punto de Impresión';
      this.business.GetPrinterPoint(this.gridMapper.SelectedRows[0].Id).then(x => {
        this.OpenModal();
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      });
    }
  }

  OpenModal() {


    this.modalWindow.title = "Agregar Punto de Impresión";
    this.modalWindow.show();
    this.PrinterPointForm.form.markAsUntouched();


  }

  SavePrinterPoint() {

    this.PrinterPointForm.form.markAllAsTouched();
    if (this.PrinterPointForm.invalid) {
      this.toast.AddToast("Error", "Fomulario invalido: Por favor ingrese todos los campos obligatorios.", 10, ToastyType.error, true);
      return;
    }

    if (this.business.CurrentPrinterPoint.Users.length === 0) {
      Swal.fire("Advertencia", "Debe agregar por lo menos un usuario.", 'warning');
      return;
    }

    this.onActionSave = true;
    this.toast.AddToast("Info", "Guardando...", 10, ToastyType.info, true);
    this.business.SavePrinterPoint(this.business.CurrentPrinterPoint).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se guardó correctamente", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar la impresora", 10, ToastyType.error, true);
      }

      this.CloseModal();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.GetPrinterPoints();
      this.onActionSave = false;
    });
  }

  DeletePrinterPoint() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea eliminar el punto de impresión " + this.gridMapper.SelectedRows[0].Name + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.business.DeletePrinterPoint(this.gridMapper.SelectedRows[0].Id).then(x => {
          if (x) {
            this.toast.AddToast("Correcto", "Punto de impresión eliminado", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo anular el punto de impresion", 10, ToastyType.error, true);
          }
          this.GetPrinterPoints();
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });

      }
    });
  }


  GetPrinterPoints() {
    this.business.GetPrinterPoints({}).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
    });
  }

  ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("OrdenesDevolución");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

  OnActivate(event) {

    if (event.type === 'dblclick') {
      this.EditPrinterPoint(false);
    }
  }

  CloseModal() {
    this.gridMapper.SelectedRows = [];
    this.PrinterPointForm.form.markAsUntouched();
    this.modalWindow.hide();
    this.GetPrinterPoints();
  }

}
