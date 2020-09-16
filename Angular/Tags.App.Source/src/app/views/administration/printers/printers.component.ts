import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { Printer } from 'src/app/model/printer';
import { AdminPrinterBusinessService } from 'src/app/business/administration/admin-printer-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {

  gridMapper: GridMapper<Printer>;
  @ViewChild('NameTemplate', { static: true }) NameTemplate: TemplateRef<any>;
  @ViewChild('AddressTemplate', { static: true }) AddressTemplate: TemplateRef<any>;
  @ViewChild('PortTemplate', { static: true }) PortTemplate: TemplateRef<any>;
  @ViewChild('SwitchTemplate', { static: true }) switchTemplate: TemplateRef<any>;
  @ViewChild('ActionsTemplate', { static: true }) actionsTemplate: TemplateRef<any>;
  editing = {};
  activeEdit: boolean = false;

  constructor(private business: AdminPrinterBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
  }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'Name', name: "Nombre", maxWidth: 300, minWidth: 300, cellTemplate: this.NameTemplate },
      { prop: 'IpAddress', maxWidth: 250, name: "Dirección IP", cellTemplate: this.AddressTemplate },
      { prop: 'Fixed', maxWidth: 150, name: 'Impresora Fija', cellTemplate: this.switchTemplate },
      { prop: 'Port', name: 'Puerto', maxWidth: 150, cellTemplate: this.PortTemplate },
      { prop: '', name: 'Acciones', canAutoResize: true, cellTemplate: this.actionsTemplate }
    ];
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    this.GetPrinters("");
  }

  updateValue(event, cell, rowIndex) {

    if (cell !== 'Fixed') {
      this.gridMapper.DisplayRows[rowIndex][cell] = event.target.value;
    } else {
      this.gridMapper.DisplayRows[rowIndex][cell] = !(this.gridMapper.DisplayRows[rowIndex][cell] as boolean);
    }

    this.gridMapper.DisplayRows = [...this.gridMapper.DisplayRows];
  }



  NewPrinter(isDuplicated: boolean) {

    let printer: Printer = new Printer();
    if (isDuplicated) {
      if (this.gridMapper.SelectedRows.length == 0)
        return;
      Object.assign(printer, this.gridMapper.SelectedRows[0]);
      printer.Name = printer.Name + " Copia";
      printer.Id = 0;
    } else {
      printer = {
        Id: 0,
        Name: "",
        IpAddress: "",
        Fixed: true,
        Port: 0
      }
    }
    if (this.gridMapper.DisplayRows == undefined) {
      this.gridMapper.DisplayRows = [printer];
    } else {
      this.gridMapper.DisplayRows = [printer, ...this.gridMapper.DisplayRows];
    }

    this.gridMapper.SelectedRows = [];
    this.editing[0] = true;
    this.activeEdit = true;
  }

  SaveChanges(rowIndex) {
    const name = this.gridMapper.DisplayRows[rowIndex]['Name'] === '';
    const ip = this.gridMapper.DisplayRows[rowIndex]['IpAddress'] === "000.000.0.0" || this.gridMapper.DisplayRows[rowIndex]['IpAddress'].match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/) === null;
    const port = this.gridMapper.DisplayRows[rowIndex]['Port'] > 9999;

    let msgError = '';
    if (name) {
      msgError += "Por favor ingrese un nombre para la impresora", 'error';
    }
    if (ip) {
      msgError += "<br>Formato  inválido para la dirección IP: <br> El formato correcto es: ###.###.###.###", 'error';
    }
    if (port) {
      msgError += "<br>El puerto no puede exceder la cifra de 9999", 'error';
    }

    if (msgError !== '') {
      Swal.fire('Error', msgError, 'error');
      return;
    }

    this.editing[rowIndex] = false;
    this.activeEdit = false;
    this.toast.AddToast("Info", "Guardando...", 10, ToastyType.info, true);
    this.business.SavePrinter(this.gridMapper.DisplayRows[rowIndex]).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se guardó correctamente", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar la impresora", 10, ToastyType.error, true);
      }
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.GetPrinters("");
    });
  }

  DeletePrint(rowIndex) {
    if (this.activeEdit) {
      this.activeEdit = false;
      this.editing[rowIndex] = false;
      this.GetPrinters("");
      return;
    }

    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea eliminar la impresora?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {
      if (!confirm.dismiss) {
        this.business.DeletePrinter(this.gridMapper.SelectedRows[0].Id).then(x => {
          if (x) {
            this.toast.AddToast("Éxito", "Se eliminó correctamente", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo eliminar la impresora", 10, ToastyType.error, true);
          }
          this.GetPrinters("");
        }).catch(x => {
          Swal.fire('Error', "" + x, 'error');
        });
      }
    });


  }

  GetPrinters(printerName: string) {
    this.business.GetPrinters(printerName).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }
}
