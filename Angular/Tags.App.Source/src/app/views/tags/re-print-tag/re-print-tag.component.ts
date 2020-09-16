import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { RePrintTagServiceService } from 'src/app/business/tags/re-print-tag-service.service';
import { RePrintTag } from 'src/app/model/re-print-tag';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { NgSelectComponent } from '@ng-select/ng-select';


@Component({
  selector: 'app-re-print-tag',
  templateUrl: './re-print-tag.component.html',
  styleUrls: ['./re-print-tag.component.scss']
})
export class RePrintTagComponent implements OnInit {

  @ViewChild('PrintForm', { static: false }) PrintForm: any;
  CurrentPrint: any;
  RePrint: RePrintTag;
  optionsProductLine: any[];
  onAction:boolean=false;
  onActionOrder: boolean = true;
  PackageNumbersValidation: boolean = false;
  @ViewChild('ProductionLineId', { static: false }) ProductionLineId: NgSelectComponent;



  dataTag: any = {};

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(private business: RePrintTagServiceService, private toast: ToastService) {
    this.CurrentPrint = new Object();
    this.RePrint = new RePrintTag();   
    this.GetProductsLines();    
  }

  ngOnInit() {
  }

  validationOrderNumber() {
    if(!this.RePrint.OrderNumber || this.RePrint.OrderNumber== "")
    {
      Swal.fire('Error', "Debe ingresar el número de orden.", 'error');
      return;
    }


    this.onActionOrder = false;
    let order = this.RePrint.OrderNumber;
    this.PrintForm.reset();
    this.business.GetOrderLocal(order).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentPrint = x;
      this.RePrint.OrderNumber = order;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionOrder = true;
    });
  }

  SelectProduct() {
    
    this.CurrentPrint.selectedOrderLine = this.CurrentPrint.OrderLines.filter(x => { return x.OrderLineId === this.RePrint.OrderLineId })[0];
    this.RePrint.Quantity = this.CurrentPrint.selectedOrderLine.QuantityUnitsByPackage;
    this.validationBatch();    
    this.CurrentPrint.selectedOrderLine.PackerCode= AppEnviroment.User.Personalize1;
  }

  validationTags() {
    let tags = this.CurrentPrint.Tags;
    let arrTags = "";

    let letters = /^[A-Za-z]/;
    var solo = tags.match(/^\d+$/); //Numero solo
    var rango = tags.match(/^\d+([-]\d+)$/); // Rango
    var items = tags.match(/^\d+([,]\d+)+$/); // Items 
    if (solo === null && rango === null && items === null) {
      Swal.fire('Advertencia', "Formato incorrecto de etiqueta(s)", 'warning');
      return;
    }

    if (rango !== null) {
      let [inicio, fin] = rango[0].split("-");
      inicio = parseInt(inicio); fin = parseInt(fin);
      if (fin - inicio < 1) {
        Swal.fire('Advertencia', "Rango incorrecto.", 'warning');
        this.PackageNumbersValidation = false;
        return;
      }
      this.dataTag.OneTag = inicio;
      for (let i = inicio; i <= fin; i++) {
        arrTags += i + ",";
      }
      arrTags = arrTags.slice(0, -1);
    }
    if (items !== null) {
      arrTags = items[0];
      this.dataTag.OneTag = arrTags.split(',')[0];
    }
    if (solo !== null) {
      arrTags = solo[0];
      this.dataTag.OneTag = solo[0];
    }

    let cant = arrTags.split(",").length;
    if (cant > 20) {
      Swal.fire('Advertencia', "Cantidad máxima de etiquetas superada. Lo maximo permitido son 20 etiquetas, ingresó " + cant, 'warning');
      return;
    }
    this.dataTag.QuantityToPrint = cant;
    this.RePrint.PackageNumbers = arrTags;
    this.PackageNumbersValidation = true;
  }

  validationBatch() {
    if (this.CurrentPrint.selectedOrderLine === undefined) {
      Swal.fire('Advertencia', "Por favor seleccione un producto antes de ingresar la cantidad.", 'warning');
      this.RePrint.Quantity = null;
      return;
    }

    if (this.CurrentPrint.DateBatch === undefined) {
      return;
    }
    let codProd = this.CurrentPrint.selectedOrderLine.ProductCode.slice(-5);
    codProd = codProd.charAt(0) === '0' ? codProd.slice(-4) : codProd;

    let fecha = this.CurrentPrint.DateBatch.split("-");
    let anio = parseInt(fecha[0]) - 1990;
    let mes = String.fromCharCode(64 + parseInt(fecha[1]));

    this.RePrint.Batch = codProd + "-" + anio + mes + fecha[2];

  }

  validationQuantity() {
    if (this.CurrentPrint.selectedOrderLine === undefined) {
      Swal.fire('Advertencia', "Por favor seleccione un producto antes de ingresar la cantidad.", 'warning');
      this.RePrint.Quantity = null;
      return;
    }
    if (this.RePrint.Quantity > this.CurrentPrint.selectedOrderLine.ToleranceByPackage) {
      Swal.fire('Advertencia', "La cantidad máxima es de " + this.CurrentPrint.selectedOrderLine.ToleranceByPackage, 'warning');
      this.RePrint.Quantity = this.CurrentPrint.selectedOrderLine.QuantityUnitsByPackage;
    }

  }

  GetProductsLines() {
    this.business.GetProductionLines().then(x => {
      this.optionsProductLine = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });

  }


  OpenModalPrint() {
    this.PrintForm.form.markAllAsTouched();
    if (this.PrintForm.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }
    if (!this.PackageNumbersValidation) {
      this.toast.AddToast("Error", "Por favor corrija las etiquetas.", 10, ToastyType.error, true);
      return false;
    }

    let tempDate = new Date();
    this.dataTag.DateNow = tempDate.getFullYear() + "/" + (tempDate.getMonth() + 1).toString().padStart(2, "0") + "/" + tempDate.getDate().toString().padStart(2, "0");
    this.dataTag.Quantity = this.RePrint.Quantity;
    this.dataTag.PackerCode = this.CurrentPrint.selectedOrderLine.Packages === null ? this.dataTag.PackerCode : this.CurrentPrint.selectedOrderLine.Packages.PackerCode;
    this.dataTag.ProductName = this.CurrentPrint.selectedOrderLine.ProductName;
    this.dataTag.UnitMeasure = this.CurrentPrint.selectedOrderLine.UnitMeasure;     
    this.dataTag.CodBarInt =  this.CurrentPrint.selectedOrderLine.CodBarInt;
    this.dataTag.Batch =   this.RePrint.Batch;
    this.dataTag.BatchBarCode =  this.dataTag.CodBarInt && this.dataTag.CodBarInt != "" ? this.dataTag.CodBarInt:   this.RePrint.Batch;
    this.dataTag.OrderLineId = this.RePrint.OrderLineId;
    this.dataTag.OrderNumber = this.RePrint.OrderNumber;
    this.dataTag.PackerCode = AppEnviroment.User.Personalize1;
    this.dataTag.ProductionLineId =this.ProductionLineId.selectedItems[0].label.split('-')[0];
    this.dataTag.RsInvima = this.CurrentPrint.selectedOrderLine.RsInvima;
    this.modalWindow.show();
  }

  CancelModal() {
    this.modalWindow.hide();
  }

  Print() {
    this.onAction = true;
    this.business.ReprintTag(this.RePrint).then(x => {
      if (x) {
        this.toast.AddToast("Información", "Se realizó correctamente la impresión.", 10, ToastyType.success, true);
        this.CurrentPrint = new Object();
        this.RePrint = new RePrintTag();
        this.PrintForm.reset();
        this.PackageNumbersValidation = false;        
      } else {
        this.toast.AddToast("Error", "No se pudo realizar la impresión: " + x, 10, ToastyType.success, true);
      }
    }).catch(x => {
      Swal.fire('Error', '' + x, 'error');
    }).finally(()=> {
      this.modalWindow.hide();
      this.onAction = false;
    });

    

  }
}
