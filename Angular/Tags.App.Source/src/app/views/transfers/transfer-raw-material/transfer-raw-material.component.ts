import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { TransferRawMaterialBusinessService } from 'src/app/business/transfers/transfer-raw-material-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { GridMapper } from 'src/app/model/grid-mapper';
import { TransferRawMaterialDetail } from 'src/app/model/transfer-raw-material-detail';
import { TransferTypes } from 'src/app/model/transfer-pt';
import { ProductByBatches } from 'src/app/model/product-by-batches';

@Component({
  selector: 'app-transfer-raw-material',
  templateUrl: './transfer-raw-material.component.html',
  styleUrls: ['./transfer-raw-material.component.scss']
})
export class TransferRawMaterialComponent implements OnInit {

  @Output() finishEvent = new EventEmitter<boolean>();
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('ModalWindowProdByBatch', { static: false }) modalWindowProdByBatch: any;
  @ViewChild('TransferRawMaterialForm', { static: false }) TransferRawMaterialForm: NgForm;
  SourceWarehouses: WarehouseFilter[];
  DestinationWarehouses: WarehouseFilter[];
  RequestNumbers: number[];
  onActionProducts: boolean = false;
  onActionSave: boolean = false;
  onActionAdd: boolean = false;
  gridMapper: GridMapper<TransferRawMaterialDetail>;
  gridMapperProdByBatch: GridMapper<ProductByBatches>;
  itemsQuantity: number = 0;
  Obs: string;
  CurrentProduct: string;
  transferTypes: any;

  constructor(public business: TransferRawMaterialBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.gridMapper.DisplayRows = [];
    this.gridMapperProdByBatch = new GridMapper();
    this.transferTypes = TransferTypes;
  }

  ngOnInit() {

    this.gridMapperProdByBatch.Columns = [
      { prop: 'PackageNumber', maxWidth: 130, name: 'ID' },
      { prop: 'ProductBatch', name: 'Lote Producto' },
      { prop: 'InternalBatchC', maxWidth: 150, name: 'Lote C' },
      { prop: 'InternalBatchP', maxWidth: 150, name: 'Lote P' },
      { prop: 'SupplierBatch', maxWidth: 150, name: 'Lote Prov' },
      { prop: 'LocationName', maxWidth: 150, name: 'Ubicación' },
      { prop: 'Quantity', maxWidth: 170, name: 'Cantidad' }
    ];

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
  }

  LoadComponent(isNew: boolean, trasferNumber: number) {
    this.fillFields();
    this.TransferRawMaterialForm.form.markAsUntouched();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    if (isNew) {
      this.modalWindow.title = "Crear Traslado";
      this.business.ResetCurrentTransfer();
      this.initTable();
    } else {
      this.modalWindow.title = 'Editar Traslado';
      this.business.GetTransfer(trasferNumber).then(x => {
        this.toast.AddToast("Información", "Se obtuvo el registro correctamente.", 10, ToastyType.success, true);
        this.gridMapper.DisplayRows = x.Details;
        this.itemsQuantity = this.gridMapper.DisplayRows.length;
        this.initTable();
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
        return;
      });
    }
    this.modalWindow.show();
  }


  GetMaterialRequest() {
    this.business.GetMaterialsRequest(this.business.CurrentTransfer.RequestNumber).then(x => {
      this.toast.AddToast("Información", "Se obtuvo el registro correctamente.", 10, ToastyType.success, true);
      this.gridMapper.DisplayRows = x.Details;
      this.itemsQuantity = this.gridMapper.DisplayRows.length;
      this.initTable();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
      return;
    });
  }

  fillFields() {
    this.business.GetSourceWarehouses().then(x => {
      this.SourceWarehouses = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

    this.business.GetDestinationWarehouses().then(x => {
      this.DestinationWarehouses = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

    this.business.GetRequestNumbers().then(x => {
      this.RequestNumbers = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
  }

  SaveTransfer() {
    this.TransferRawMaterialForm.form.markAllAsTouched();
    if (!this.TransferRawMaterialForm.form.valid) {
      this.toast.AddToast("Error", "Por favor ingrese todos los campos obligatorios (*)", 10, ToastyType.error, true);
      return;
    }

    //let expReg = /^([0-9])+\-([0-9])+\-([0-9])+$/;
    let parts = this.CurrentProduct.split("-");
    if (parts.length !== 3) {
      this.toast.AddToast("Error", "Por favor ingrese una etiqueta válida con formato: 0-0000-0", 10, ToastyType.error, true);
      return;
    }

    let universalTag = parts[0];
    this.business.CurrentTransfer.Details = [];
    let detail = new TransferRawMaterialDetail();
    detail.DetailId = 0;
    detail.UniversalTagId = parseInt(universalTag);
    this.business.CurrentTransfer.Details.push(detail);

    if (this.business.CurrentTransfer.DestinationWarehouseCode === this.business.CurrentTransfer.SourceWarehouseCode) {
      this.toast.AddToast("Error", "No puede seleccionar la misma bodega de origen y destino.", 10, ToastyType.error, true);
      this.business.CurrentTransfer.DestinationWarehouseCode = null;
      this.business.CurrentTransfer.SourceWarehouseCode = null;
      return;
    }

    this.onActionAdd = true;
    this.business.SaveTransfer(this.business.CurrentTransfer).then(x => {
      if (x) {
        this.toast.AddToast("Correcto", "Se agregó correctamente", 15, ToastyType.success, true);
        this.gridMapper.DisplayRows = x.Details;
        this.itemsQuantity = this.gridMapper.DisplayRows.length;

      } else {
        this.toast.AddToast("Error", "No se pudo agregar.", 10, ToastyType.error, true);
      }
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 1);

      this.TransferRawMaterialForm.form.markAsUntouched();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionAdd = false;
      this.CurrentProduct = null;
    });
  }


  RemoveTransferDetail() {

    if (this.gridMapper.SelectedRows.length == 0) {
      this.toast.AddToast("Advertencia", "Seleccione una fila para eliminar.", 10, ToastyType.warning, true);
      return;
    }
    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Está seguro de que desea eliminar la fila seleccionada?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {
      if (confirm.dismiss) {
        return;
      } else {
        this.business.RemoveTransferDetail(this.gridMapper.SelectedRows[0].DetailId).then(x => {
          this.toast.AddToast("Correcto", "Se eliminó correctamente", 15, ToastyType.success, true);
          this.gridMapper.DisplayRows = x.Details;
          this.itemsQuantity = this.gridMapper.DisplayRows.length;
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
      }
    });
  }

  FinishTransfer() {

    this.business.FinishTransfer(this.business.CurrentTransfer.TransferNumber, this.Obs).then(x => {
      this.toast.AddToast("Correcto", "Se terminó correctamente", 15, ToastyType.success, true);
      this.Finish();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {

    });

  }

  CancelTransfer() {
    if (this.business.CurrentTransfer.TransferNumber !== 0) {
      Swal.fire({
        title: "Confirmar Acción",
        text: "¿Desea anular el " + this.business.CurrentTransfer.TransferNumber + "?",
        type: 'warning',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: false,
        showCancelButton: true
      }).then((confirm) => {

        if (!confirm.dismiss) {
          this.business.CancelTransfer(this.business.CurrentTransfer.TransferNumber).then(x => {
            if (x) {
              this.toast.AddToast("Correcto", "Se Anuló correctamente", 10, ToastyType.success, true);

            } else {
              this.toast.AddToast("Error", "No se pudo anular.", 10, ToastyType.error, true);
            }
            this.gridMapper.SelectedRows = [];
          }).catch(x => {
            Swal.fire("Error", "" + x, 'error');
          }).finally(() => {
            this.Finish();
          })
          return;
        }
      });

    } else {
      this.Finish();
    }

  }


  GetProductByBatch() {
    if (this.gridMapper.SelectedRows.length == 0) {
      this.toast.AddToast("Advertencia", "Seleccione una fila para ver lote.", 10, ToastyType.warning, true);
      return;
    }
    this.business.GetProductByBatch(this.gridMapper.SelectedRows[0].ProductCode, this.business.CurrentTransfer.SourceWarehouseCode).then(x => {
      this.toast.AddToast("Correcto", "Se obtuvo correctamente los registros", 15, ToastyType.success, true);
      this.gridMapperProdByBatch.DisplayRows = x;
      this.modalWindowProdByBatch.show();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {

    });

  }

  ChangeTransferType(type: number) {
    this.gridMapper.DisplayRows = [];
    this.gridMapper.SelectedRows = [];
    this.itemsQuantity = 0;
    this.business.ResetCurrentTransfer();
    this.TransferRawMaterialForm.form.reset();
    this.business.CurrentTransfer.TransferTypeId = type;
    this.initTable();
  }

  Finish() {
    this.CurrentProduct = null;
    this.TransferRawMaterialForm.form.markAsUntouched();
    this.gridMapper.DisplayRows = [];
    this.gridMapper.SelectedRows = [];
    this.gridMapperProdByBatch.DisplayRows = [];
    this.itemsQuantity = 0;
    this.business.ResetCurrentTransfer();
    this.Obs = null;
    this.modalWindow.hide();
    this.finishEvent.emit(true);
  }

}
