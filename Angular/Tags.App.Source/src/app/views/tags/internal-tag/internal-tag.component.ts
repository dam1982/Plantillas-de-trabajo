import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { Order } from 'src/app/model/order';
import { InternalTag } from 'src/app/model/internal-tag';
import { InternalTagBusinessService } from 'src/app/business/tags/internal-tag-service.service';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { NgSelectComponent } from '@ng-select/ng-select';


@Component({
  selector: 'app-internal-tag',
  templateUrl: './internal-tag.component.html',
  styleUrls: ['./internal-tag.component.scss']
})
export class InternalTagComponent implements OnInit {

  @ViewChild('PrintForm', { static: false }) PrintForm: any;
  CurrentPrint: any;
  OrderSave: Order;
  InternalTagSave: InternalTag;
  optionsProductLine: any[];
  onAction:boolean=false;
  onActionOrder: boolean = true;
  @ViewChild('ProductionLineId', { static: false }) ProductionLineId: NgSelectComponent;
  

  dataTag: any = {
    'ProductName': '',
    'Quantity': '',
    'Batch': '',
    'OrderLineId': '',
    'OneTag': '',
    'DateNow': '',
    'PackerCode': '',
    'QuantityToPrint': 20,
    'RsInvima':''
  };

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(private business: InternalTagBusinessService, private toast: ToastService) {
    this.CurrentPrint = new Object();
    this.InternalTagSave = new InternalTag();
    this.InternalTagSave.InternalTagId = 0;    
    let tempDate = new Date();
    this. InternalTagSave.CreationDate = tempDate.getFullYear() + "/" + (tempDate.getMonth() + 1).toString().padStart(2, "0") + "/" + tempDate.getDate().toString().padStart(2, "0"); 
    this.GetProductsLines();
    
  }

  ngOnInit() {
  }

  validationOrderNumber() {
    if(!this.CurrentPrint.OrderNumber || this.CurrentPrint.OrderNumber== "")
    {
      Swal.fire('Error', "Debe ingresar el número de orden.", 'error');
      return;
    }

    this.onActionOrder = false;
    let order = this.CurrentPrint.OrderNumber;
    this.PrintForm.reset();
    this.business.GetOrderData(order).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentPrint = x;
      this.CurrentPrint.OrderNumber = order;
    }).catch(x => {
      Swal.fire('Error',"" + x, 'error');
    }).finally(() => {
      this.onActionOrder = true;
    });
  }

  SelectProduct() {
    this.CurrentPrint.selectedOrderLine = this.CurrentPrint.OrderLines.filter(x => { return x.OrderLineId === this.CurrentPrint.OrderLineId })[0];
    this.InternalTagSave.Quantity = this.CurrentPrint.selectedOrderLine.QuantityUnitsByPackage;
    this.InternalTagSave.QuantityToPrint = 20;    
    this.validationBatch();    
    this.InternalTagSave.PackerCode = AppEnviroment.User.Personalize1 && AppEnviroment.User.Personalize1!= "" ?  parseInt(AppEnviroment.User.Personalize1):0;
    
  }

  validationBatch() {
    if (this.CurrentPrint.selectedOrderLine === undefined) {
      Swal.fire('Advertencia', "Por favor seleccione un producto antes de ingresar la cantidad.", 'warning');
      this.InternalTagSave.Quantity = undefined;
      return;
    }

    if (this.CurrentPrint.DateBatch === undefined) {
      return;
    }

    this.InternalTagSave.GenerateBatch(this.CurrentPrint.selectedOrderLine.ProductCode, this.CurrentPrint.DateBatch)
  }

  validationQuantity() {
    if (this.CurrentPrint.selectedOrderLine === undefined) {
      Swal.fire('Advertencia', "Por favor seleccione un producto antes de ingresar la cantidad.", 'warning');
      this.CurrentPrint.QuantityUnitsByPackage = undefined;
      return;
    }
    if (this.InternalTagSave.Quantity > this.CurrentPrint.selectedOrderLine.ToleranceByPackage) {
      Swal.fire('Advertencia', "La cantidad máxima es de " + this.CurrentPrint.selectedOrderLine.ToleranceByPackage, 'warning');
      this.InternalTagSave.Quantity = this.CurrentPrint.selectedOrderLine.QuantityUnitsByPackage;
      return;
    }
  }
  validationQuantityToPrint() {
    if (this.InternalTagSave.QuantityToPrint > 20) {
      Swal.fire('Advertencia', "La cantidad permitida a imprimir es de 20", 'warning');
      this.InternalTagSave.QuantityToPrint = 20;
    }
  }

  OpenModalPrint() {
    this.PrintForm.form.markAllAsTouched();
    if (this.PrintForm.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }
    
    this.InternalTagSave.PackerName = AppEnviroment.User.Names;
    this.CurrentPrint.selectedOrderLine.Packages = [this.InternalTagSave];

    this.OrderSave = new Order();
    this.OrderSave.OrderNumber = this.CurrentPrint.OrderNumber;
    this.OrderSave.PurchaseOrderNumber = this.CurrentPrint.PurchaseOrderNumber;
    this.OrderSave.Customer = this.CurrentPrint.Customer;
    this.OrderSave.Addressee = this.CurrentPrint.Addressee;
    this.OrderSave.OrderLines = [this.CurrentPrint.selectedOrderLine];
    this.OrderSave.OrderLines[0].QuantityUnitsByPackage = this.InternalTagSave.Quantity;

    //Datos previsualizaciòn
    this.dataTag.QuantityToPrint = this.InternalTagSave.QuantityToPrint;
    this.dataTag.Quantity =  this.InternalTagSave.Quantity;
    this.dataTag.OneTag = '0';
    this.InternalTagSave.Batch;
    this.dataTag.OrderLineId = this.CurrentPrint.selectedOrderLine.OrderLineId;
    this.dataTag.OrderNumber = this.CurrentPrint.OrderNumber;
    this.dataTag.PackerCode =  this.InternalTagSave.PackerCode;
    this.dataTag.ProductName = this.CurrentPrint.selectedOrderLine.ProductName;
    this.dataTag.UnitMeasure = this.CurrentPrint.selectedOrderLine.UnitMeasure;  
    this.dataTag.CodBarInt =  this.CurrentPrint.selectedOrderLine.CodBarInt;
    this.dataTag.Batch =   this.InternalTagSave.Batch;
    this.dataTag.BatchBarCode =  this.dataTag.CodBarInt && this.dataTag.CodBarInt != "" ? this.dataTag.CodBarInt :  this.InternalTagSave.Batch;
    this.dataTag.DateNow = this.InternalTagSave.CreationDate;
    this.dataTag.ProductionLineId =this.ProductionLineId.selectedItems[0].label.split('-')[0];
    this.dataTag.RsInvima = this.CurrentPrint.selectedOrderLine.RsInvima;
    this.modalWindow.show();
  }

  Print() {
    this.onAction = true;
    this.business.SaveTags(this.OrderSave).then(x => {
      if (x) {
        this.toast.AddToast("Información", "Se realizó correctamente la impresión", 10, ToastyType.success, true);
        this.CurrentPrint = new Object();
        this.OrderSave = new Order();
        this.PrintForm.reset();
        
      } else {
        this.toast.AddToast("Error", "" + x, 10, ToastyType.success, true);
      }
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    })
    .finally(()=> {
      this.modalWindow.hide();
      this.onAction = false;
    });

  }

  CancelModal() {
    this.modalWindow.hide();
  }

  GetProductsLines() {
    this.business.GetProductionLines().then(x => {
      this.optionsProductLine = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

}
