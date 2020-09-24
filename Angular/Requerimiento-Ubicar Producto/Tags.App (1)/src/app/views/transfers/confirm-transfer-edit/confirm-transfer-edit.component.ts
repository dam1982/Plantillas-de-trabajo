import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { TransferPTDetails } from 'src/app/model/transfer-pt-details';
import { ConfirmTransferBusinessService } from 'src/app/business/transfers/confirm-transfer-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { TransferPT, TransferTypes } from 'src/app/model/transfer-pt';
import Swal from 'sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-confirm-transfer-edit',
  templateUrl: './confirm-transfer-edit.component.html',
  styleUrls: ['./confirm-transfer-edit.component.scss']
})
export class ConfirmTransferEditComponent implements OnInit {

  @ViewChild("dataTableDetail", { static: false }) dataTableDetail: DatatableComponent;
  @ViewChild('ModalWindow', { static: false }) ModalWindow: any;
  @ViewChild('RejectWindow', { static: false }) rejectWindow: any;
  @ViewChild('rejectForm', { static: false }) rejectForm: NgForm;
  @ViewChild('InternalTagInput', { static: false }) InternalTagInput: ElementRef;
  @Output() OnFinishEvent = new EventEmitter<boolean>();
  
  CurrentTransfer: TransferPT;
  CurrentDetail: TransferPTDetails;
  gridMapperDetail: GridMapper<TransferPTDetails>;

  optionReasons: any = [];

  ItemsDetails: number = 0;
  UndsDetails: number = 0;
  ConfirmItems: number = 0;
  RejectItems: number = 0;
  onAction: boolean;
  constructor(public business: ConfirmTransferBusinessService, private toast: ToastService) {
    this.gridMapperDetail = new GridMapper();
    this.CurrentTransfer = new TransferPT(TransferTypes.Transfer);

    this.business.GetReasonsNoConfirmation().then(x => {
      this.optionReasons = x;
    }).catch(x => {
      Swal.fire('Error', "Error obteniendo los estados " + x, 'error');
    });
  }

  ngOnInit() {
    this.gridMapperDetail.Columns = [
      { prop: 'PackagesInfo.PackageNumber', flexGrow: 1, name: "Paquete" },
      { prop: "PackagesInfo.ProductName", flexGrow: 3, name: 'Producto' },
      { prop: 'Quantity', flexGrow: 1, name: 'Cantidad' },
      { prop: "PackagesInfo.Batch", flexGrow: 2, name: 'Lote' },
      { prop: "PackagesInfo.OrderNumber", flexGrow: 1, name: 'Nro Orden' },
      { prop: "PackagesInfo.CustomerName", flexGrow: 3, name: 'Cliente' },
      { prop: "PackagesInfo.AddresseeName", flexGrow: 3, name: 'Destinatario' },
      { prop: "PackagesInfo.OrderLineId", flexGrow: 1, name: 'Pedido interno' }
    ];
  }

  LoadComponent(transfer: TransferPT) {
    this.CurrentTransfer = transfer;
    this.gridMapperDetail.DisplayRows = this.CurrentTransfer.Details;
    this.InternalTagInput.nativeElement.value = '';
    this.CalcQuatities();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    this.ModalWindow.show();
  }


  GetRowClass(row){
    return {
      'bg-danger': row.Confirmed== false,
      'bg-success': row.Confirmed == true,
    }
  }


  CalcQuatities() {
    this.UndsDetails = 0;
    this.ItemsDetails = this.CurrentTransfer.Details.length;
    this.CurrentTransfer.Details.forEach(x => {
      this.UndsDetails += x.Quantity;
    });
    this.ConfirmItems = this.CurrentTransfer.Details.filter(x => { return x.Confirmed == true }).length;
    this.RejectItems = this.CurrentTransfer.Details.filter(x => { return x.Confirmed == false }).length;
  }

  ConfirmInternalTag() {
    if (this.InternalTagInput.nativeElement.value == "")
      return;
    var values = this.InternalTagInput.nativeElement.value.split('!');

    try {
      if (values.length != 2)
        throw new Error("La etiqueta ingresada no tiene un formato válido");

      var match = this.CurrentTransfer.Details.filter(x => {
        return x.PackagesInfo.PackageNumber == Number(values[0]) && x.PackagesInfo.OrderLineId == Number(values[1])
      });
      if (match.length > 0) {
        match[0].Confirmed = true;
        this.RefreshDetails();
      } else {
        throw new Error("La etiqueta ingresada no hace parte de la orden seleccionada.");
      }

    } catch (error) {
      this.InternalTagInput.nativeElement.value = "";
      this.InternalTagInput.nativeElement.focus();
      Swal.fire({ title: "Error", text: error.message, type: 'error', showCloseButton: true });

    }
  }

  RejectInternaltag() {
    if (this.gridMapperDetail.SelectedRows.length == 0) {
      this.toast.AddToast("Advertencia", "Seleccione una fila.", 10, ToastyType.warning, true);
      return;
    }
    this.CurrentDetail = JSON.parse(JSON.stringify(this.gridMapperDetail.SelectedRows[0]));
    this.rejectWindow.show();
  }

  SaveReject() {
    this.rejectForm.form.markAllAsTouched();
    if (this.rejectForm.form.invalid) {
      this.toast.AddToast("Error", "Existen datos sin diligenciar en el formulario.", 10, ToastyType.error, true);
      return false;
    }

    this.CurrentTransfer.Details.forEach(x => {
      if (x.PackagesInfo.PackageNumber == this.CurrentDetail.PackagesInfo.PackageNumber && x.PackagesInfo.OrderLineId == this.CurrentDetail.PackagesInfo.OrderLineId) {
        x.Confirmed = false;
        x.Observations = this.CurrentDetail.Observations;
        x.ReasonId = this.CurrentDetail.ReasonId;
      }
    });
    this.RefreshDetails();
    this.rejectForm.reset();
    this.toast.AddToast("Información", "Se realizó la devolución correctamente", 10, ToastyType.success, true);
    this.rejectWindow.hide();
  }

  RefreshDetails() {
    this.gridMapperDetail.DisplayRows = this.CurrentTransfer.Details.filter(x => { return x });
    this.InternalTagInput.nativeElement.value = '';
    this.CalcQuatities();
    this.gridMapperDetail.SelectedRows = [];
  }

  ConfirmTransfer() {
    try {
      if (this.CurrentTransfer.Details.filter(x => { return x.Confirmed == null }).length > 0)
        throw new Error("No ha establecido el estado de todos los paquetes. Debe confirmar o devolver la totalidad de los paquetes.");
      this.onAction = true;
      this.business.ConfirmTransfer(this.CurrentTransfer).then(x => {
        this.toast.AddToast("Información", "Se realizó la confirmación del traslado correctamente", 10, ToastyType.success, true);
        this.OnFinishEvent.emit(true);
        this.ModalWindow.hide();
      }).finally(() => this.onAction = false);
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, type: 'error', showCloseButton: true });
    }
  }

  CloseModal()
  {    
    this.OnFinishEvent.emit(false);
    this.ModalWindow.hide();
  }
  
}
