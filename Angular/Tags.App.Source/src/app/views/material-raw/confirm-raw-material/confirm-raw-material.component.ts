import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { TransferRawMaterialDetail } from 'src/app/model/transfer-raw-material-detail';
import { NgForm } from '@angular/forms';
import { ConfirmRawMaterialBusinessService } from 'src/app/business/material-raw/confirm-raw-material-business.service';
import { TransferTypes } from 'src/app/model/transfer-pt';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-confirm-raw-material',
  templateUrl: './confirm-raw-material.component.html',
  styleUrls: ['./confirm-raw-material.component.scss']
})
export class ConfirmRawMaterialComponent implements OnInit {


  @Output() finishEvent = new EventEmitter<boolean>();
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('ConfirmForm', { static: false }) confirmForm: NgForm;
  gridMapper: GridMapper<TransferRawMaterialDetail>;

  onActionSave:boolean=false;
  onActionConfirm: boolean = false;

  transferTypes: any;
  CurrentProduct;
  Obs: string = "";

  constructor(public business: ConfirmRawMaterialBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.gridMapper.DisplayRows = [];
    this.transferTypes = TransferTypes;
  }

  ngOnInit() {
  }


  initTable() {
    if (this.business.CurrentTransfer.TransferTypeId === TransferTypes.Transfer) {
      this.gridMapper.Columns = [
        { prop: 'DetailId', maxWidth: 130, name: 'Et Id' },
        { prop: 'ProductCode', maxWidth: 130, name: 'Cod Producto' },
        { prop: 'ProductName', name: 'Producto' },
        { prop: 'RequestedQuantity', maxWidth: 130, name: 'Cant Solicitada' },
        { prop: 'DeliveredQuantity', maxWidth: 130, name: 'Cant Entregada' },
        { prop: 'UnitMeasure', maxWidth: 100, name: 'UE' },
        { prop: 'InternalBatchC', maxWidth: 150, name: 'Lote C' },
        { prop: 'InternalBatchP', maxWidth: 150, name: 'Lote P' },
        { prop: 'SupplierBatch', maxWidth: 150, name: 'Lote Prov' },
        { prop: 'ProductBatch', maxWidth: 170, name: 'Lote Producto' },
      ];
    } else {
      this.gridMapper.Columns = [
        { prop: 'ProductCode', maxWidth: 130, name: 'Cod Producto' },
        { prop: 'ProductName', name: 'Producto' },
        { prop: 'RequestedQuantity', maxWidth: 130, name: 'Cant Solicitada' },
        { prop: 'DeliveredQuantity', maxWidth: 130, name: 'Cant Entregada' },
        { prop: 'UnitMeasure', maxWidth: 100, name: 'UE' },
        { prop: 'InternalBatchC', maxWidth: 150, name: 'Lote C' },
        { prop: 'InternalBatchP', maxWidth: 150, name: 'Lote P' },
        { prop: 'SupplierBatch', maxWidth: 150, name: 'Lote Prov' },
        { prop: 'ProductBatch', maxWidth: 170, name: 'Lote Producto' },
      ];
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);

  }

  LoadComponent(trasferNumber: number) {

    this.confirmForm.form.markAsUntouched();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    this.modalWindow.title = 'Recibir Traslados';
    this.business.GetTransfer(trasferNumber).then(x => {
      this.toast.AddToast("Información", "Se obtuvo el registro correctamente.", 10, ToastyType.success, true);
      this.gridMapper.DisplayRows = x.Details;

      this.initTable();
      this.modalWindow.show();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
      return;
    });


  }

  SaveTransfer() {
    this.confirmForm.form.markAllAsTouched();
    if (!this.confirmForm.form.valid) {
      this.toast.AddToast("Error", "Por favor ingrese todos los campos obligatorios (*)", 10, ToastyType.error, true);
      return;
    }

    this.onActionConfirm = true;
    this.business.ConfirmTransfer(this.business.CurrentTransfer.TransferNumber, this.CurrentProduct).then(x => {
      if (x) {
        this.toast.AddToast("Correcto", "Se agregó correctamente", 10, ToastyType.success, true);
        this.gridMapper.DisplayRows = x.Details;

      } else {
        this.toast.AddToast("Error", "No se pudo agregar.", 10, ToastyType.error, true);
      }
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
      this.confirmForm.form.markAsUntouched();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionConfirm = false;

      this.CurrentProduct = null;
    });
  }


  FinishTransfer() {

    this.business.FinishConfirm(this.business.CurrentTransfer.TransferNumber, this.Obs).then(x => {
      this.toast.AddToast("Correcto", "Se terminó correctamente", 15, ToastyType.success, true);
      this.Finish();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {

    });

  }

  GetRowClass(row) {
    return {
      'bg-success': row.Received === true,
    }
  }
  Finish() {
    this.CurrentProduct = null;
    this.confirmForm.form.reset();
    this.gridMapper.DisplayRows = [];
    this.gridMapper.SelectedRows = [];

    this.business.ResetCurrentTransfer();
    this.Obs = null;
    this.modalWindow.hide();
    this.finishEvent.emit(true);
  }
}
