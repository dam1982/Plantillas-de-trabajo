import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductFilter } from 'src/app/model/product-filter';
import { NgForm } from '@angular/forms';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { ReturnOrderBusinessService } from 'src/app/business/returns/return-order-business.service';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.scss']
})
export class ReturnOrderComponent implements OnInit {

  @Output() finishEvent = new EventEmitter<boolean>();
  products: ProductFilter[];
  warehouses: WarehouseFilter[];
  reasons: Object[];

  @ViewChild('ReturnOrderForm', { static: false }) ReturnOrderForm: NgForm;
  onActionProducts: boolean = false;
  onActionSave: boolean = false;

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(private businessOrder: ReturnOrderBusinessService, private toast: ToastService) {
  }

  ngOnInit() {
    this.fillFields();
  }


  LoadComponent() {
    this.ReturnOrderForm.form.markAsUntouched();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    if (this.businessOrder.CurrentReturn.ReturnNumber) {
      this.GetProducts(this.businessOrder.CurrentReturn.OrderNumber);
    } else {
      this.products = [];
    }


  }

  fillFields() {
    this.businessOrder.GetReasons().then(x => {
      this.reasons = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

    this.businessOrder.GetWarehouses().then(x => {
      this.warehouses = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
  }

  GetProducts(orderNumber: any) {

    if (orderNumber === "" || orderNumber === undefined) {
      this.toast.AddToast("Advertencia", "Por favor ingrese un numero de orden para buscar los productos.", 10, ToastyType.warning, true);
      return;
    }

    this.onActionProducts = true;
    this.businessOrder.GetProducts(orderNumber).then(x => {
      if (x.length == 0) {
        this.businessOrder.CurrentReturn.ProductCode = "";
        this.businessOrder.CurrentReturn.ProductName = "";
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

  SaveOrder() {
    this.ReturnOrderForm.form.markAllAsTouched();
    if (!this.ReturnOrderForm.form.valid) {
      this.toast.AddToast("Advertencia", "Por favor ingrese todos los campos obligatorios (*)", 10, ToastyType.warning, true);
      return;
    }
    const packages = this.businessOrder.CurrentReturn.PackagesNumber;
    const solo = packages.match(/^\d+$/); //Numero solo
    const rango = packages.match(/^\d+([-]\d+)([,]\d+)*$/);//Rango
    const items = packages.match(/^\d+([,]\d+)+$/);  // Items obligatorio

    if (solo === null && rango === null && items === null) {
      Swal.fire("Advertencia", "Solo se permiten los siguientes formatos para los paquetes:  <br/> * Una caja (1)  <br/> * Rango de cajas (1-6) <br/> * Varias cajas no consecutivas (1,3,5,6) <br/> * Rango junto con cajas no consecutivas (1-6,8,11)", 'warning');
      return;
    }

    this.onActionSave = true;
    this.businessOrder.CurrentReturn.DestinationWarehouseName = this.warehouses.filter(x => {
      return this.businessOrder.CurrentReturn.DestinationWarehouseCode === x.Code;
    })[0].Name;

    this.businessOrder.SaveOrder(this.businessOrder.CurrentReturn).then(x => {
      if (x > -1) {
        this.toast.AddToast("Correcto", "Devolución Guardada con el numero " + x, 15, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar la devolución.", 10, ToastyType.error, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionSave = false;
    });
  }

  Finish() {
    this.ReturnOrderForm.form.markAsUntouched();
    this.modalWindow.hide();
    this.finishEvent.emit(true);
  }


}
