import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TransferBusinessService } from 'src/app/business/queries/transfer-business.service';
import { TransferPTDetails } from 'src/app/model/transfer-pt-details';
import { GridMapper } from 'src/app/model/grid-mapper';
import { TransferPT, TransferTypes } from 'src/app/model/transfer-pt';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';

@Component({
  selector: 'app-transfer-pt-edit',
  templateUrl: './transfer-pt-edit.component.html',
  styleUrls: ['./transfer-pt-edit.component.scss']
})
export class TransferPtEditComponent implements OnInit {

 
  @ViewChild('SourceWarehouseSelect', { static: false }) SourceWarehouseSelect: any;
  @ViewChild('DestinationWarehouseSelect', { static: false }) DestinationWarehouseSelect: any;
  @ViewChild('QueryTransferForm', { static: false }) QueryTransferForm: any;
  @ViewChild('InternalTagInput', { static: false }) InternalTagInput: any;
  @ViewChild('ModalWindow', { static: false }) ModalWindow: any;
  @Output() OnFinishEvent = new EventEmitter<boolean>();


  optionsSourceWarehouse: WarehouseFilter[] = [];
  optionsDestinationWarehouse: WarehouseFilter[] = [];

  gridMapperDetail: GridMapper<TransferPTDetails>;
  CurrentTransfer: TransferPT = new TransferPT(TransferTypes.Transfer);
  onAction: boolean = false;
  ItemsDetails: number = 0;
  UndsDetails: number = 0;



  internalTag = {
    "packageNumber": null,
    "orderLineId": null,
    "returnNumber" : null
  }

  constructor(private business: TransferBusinessService, private toast: ToastService) { 
    this.gridMapperDetail = new GridMapper();

  }


  ngOnInit() {
    this.gridMapperDetail.Columns = [
      { prop: 'PackagesInfo.PackageNumber', flexGrow: 1, name: "Paquete" },
      { prop: "PackagesInfo.ProductName", flexGrow: 2, name: 'Producto' },
      { prop: 'Quantity', flexGrow: 1, name: 'Cantidad' },
      { prop: "PackagesInfo.Batch", flexGrow: 2, name: 'Lote' },
      { prop: "PackagesInfo.OrderNumber", flexGrow: 1, name: 'Nro Orden' },
      { prop: "PackagesInfo.CustomerName", flexGrow: 2, name: 'Cliente' },
      { prop: "PackagesInfo.AddresseeName", flexGrow: 2, name: 'Destinatario' },
      { prop: "PackagesInfo.OrderLineId", flexGrow: 1, name: 'Pedido interno' }
    ];
  }

  LoadComponent(transfer:TransferPT)
  {
    this.CurrentTransfer = transfer;
    this.optionsSourceWarehouse = [{ "Name": transfer.SourceWarehouseName, "Code": transfer.SourceWarehouseCode }];
    this.optionsDestinationWarehouse = [{ "Name": transfer.DestinationWarehouseName, "Code": transfer.DestinationWarehouseCode }];   
    this.SourceWarehouseSelect.setDisabledState(transfer.id!=0);
    this.DestinationWarehouseSelect.setDisabledState(transfer.id!=0);
    this.gridMapperDetail.DisplayRows = transfer.Details;
    this.CalcQuatities();
    this.ModalWindow.show();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }

 

  CleanForm() {
    this.QueryTransferForm.reset();
  }

  GetWarehouses(source: boolean) {
    let value = null;
    if (source) {
      value = this.SourceWarehouseSelect.searchTerm;
    } else {
      value = this.DestinationWarehouseSelect.searchTerm;
    }
    if (value !== null && value.length >= 2) {
      this.business.GetWarehouses(value).then(x => {
        if (source) {
          this.optionsSourceWarehouse = x;
        } else {
          this.optionsDestinationWarehouse = x;
        }

      }).catch(x => {
        Swal.fire('Error', x, 'error');
      });
    }
  }

  
  AddInternalTag() {
    if (this.InternalTagInput.nativeElement.value == "")
      return;
    var values = this.InternalTagInput.nativeElement.value.split('!');

    if (values.length != 2) {
      this.InternalTagInput.nativeElement.value = "";
      this.InternalTagInput.nativeElement.focus();
      Swal.fire('Error', "La etiqueta ingresada no tiene un formato válido.", 'error');
      return;
    }

    this.internalTag = {
      "packageNumber": parseInt(values[0]),
      "orderLineId": parseInt(values[1]),
      "returnNumber":null
    }

    let exist: boolean = this.CurrentTransfer.Details.filter(x => {
      return x.PackagesInfo.PackageNumber === this.internalTag.packageNumber && x.PackagesInfo.OrderLineId === this.internalTag.orderLineId;
    }).length > 0;

    if (exist) {
      this.toast.AddToast("Advertencia", "La etiqueta ya se encuentra registrada en este traslado ", 10, ToastyType.warning, true);
      return;
    }
    this.onAction = true;
    this.business.GetDetail(this.internalTag).then(x => {
      if (x !== null) {
        this.CurrentTransfer.Details.push(x);
        this.gridMapperDetail.DisplayRows = this.CurrentTransfer.Details.filter(x => { return x });
        this.CalcQuatities();
      } else {
        this.toast.AddToast("Error", "No existe la etiqueta", 10, ToastyType.error, true);
      }
    }).catch(x => {
      Swal.fire('Error', x, 'error');
    }).finally(() => {
      this.InternalTagInput.nativeElement.value = "";
      this.onAction = false;
    });
  }

  DeleteInternalTag() {
    if (this.gridMapperDetail.SelectedRows.length == 0) {
      this.toast.AddToast("Advertencia", "Seleccione una fila.", 10, ToastyType.warning, true);
      return;
    }
    var selected = this.gridMapperDetail.SelectedRows[0];
    this.CurrentTransfer.Details = this.CurrentTransfer.Details.filter(x => {
      return x.PackagesInfo.OrderLineId != selected.PackagesInfo.OrderLineId || x.PackagesInfo.PackageNumber != selected.PackagesInfo.PackageNumber;
    });
    this.gridMapperDetail.DisplayRows = this.CurrentTransfer.Details;
    this.toast.AddToast("Información", "La acción se realizó con éxito.", 10, ToastyType.success, true);

  }


  SaveTransferPT() {

    if (this.SourceWarehouseSelect.selectedItems.length == 0 || this.DestinationWarehouseSelect.selectedItems.length == 0) {
      this.toast.AddToast("Error", "Debe seleccionar bodega origen y bodega destino.", 10, ToastyType.error, true);
      return;
    }
    if (this.CurrentTransfer.Details.length == 0) {
      this.toast.AddToast("Error", "No ha incluido etiquetas para el traslado.", 10, ToastyType.error, true);
      return;
    }

    this.CurrentTransfer.SourceWarehouseName = this.SourceWarehouseSelect.selectedItems[0].label;
    this.CurrentTransfer.DestinationWarehouseName = this.DestinationWarehouseSelect.selectedItems[0].label;

    this.onAction = true;
    this.business.SaveTransfer(this.CurrentTransfer).then(x => {
      if (x) {
        this.toast.AddToast("Información", "La acción se realizó con éxito.", 10, ToastyType.success, true);
        this.OnFinishEvent.emit(true);
        this.ModalWindow.hide();       
      } else {
        Swal.fire('Error', "No se pudo guardar el traslado: " + x, 'error');
      }
    }).catch(x => {
      Swal.fire('Error', x, 'error');
    }).finally(() => this.onAction = false);

  }

  
  CalcQuatities() {
    this.UndsDetails = 0;
    this.ItemsDetails = this.CurrentTransfer.Details.length;
    this.CurrentTransfer.Details.forEach(x => {
      this.UndsDetails += x.Quantity;
    })
  }

  CloseModal()
  {    
    this.OnFinishEvent.emit(false);
    this.ModalWindow.hide();
  }
  
}
