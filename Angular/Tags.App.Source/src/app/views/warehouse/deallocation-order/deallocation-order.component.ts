import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ProductFilter } from 'src/app/model/product-filter';
import { DeallocationOrderBusinessService } from 'src/app/business/warehouse/deallocation-order-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-deallocation-order',
  templateUrl: './deallocation-order.component.html',
  styleUrls: ['./deallocation-order.component.scss']
})
export class DeallocationOrderComponent implements OnInit {


  @Output() finishEvent = new EventEmitter<boolean>();
  products: ProductFilter[];
  storageTypes: Object[];
  reasons: Object[];

  @ViewChild('DeallocationForm', { static: false }) DeallocationForm: NgForm;
  onActionProducts: boolean = false;
  onActionSave: boolean = false;

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  constructor(public businessOrder: DeallocationOrderBusinessService, private toast: ToastService) {
  }

  ngOnInit() {
    this.fillFields();
  }


  LoadComponent() {
    this.DeallocationForm.form.markAsUntouched();
    if (this.businessOrder.CurrentDeallocation.DeallocationNumber) {
      this.GetProducts(this.businessOrder.CurrentDeallocation.OrderNumber);
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

    this.businessOrder.GetStorageTypes().then(x => {
      this.storageTypes = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
  }

  GetProducts(orderNumber: any) {

    if (orderNumber === "" || orderNumber === undefined) {
      this.toast.AddToast("Advertencia", "Por favor ingrese un numero de orden para buscar los productos.", 10, ToastyType.warning, true);
      return;
    }
    this.products = [];
    this.onActionProducts = true;
    this.businessOrder.GetProducts(orderNumber).then(x => {
      if (x.length == 0) {
        this.businessOrder.CurrentDeallocation.ProductCode = "";
        this.businessOrder.CurrentDeallocation.ProductName = "";
        this.toast.AddToast("Advertencia", "No se encontraron productos asociados al numero de orden.", 10, ToastyType.error, true);
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
    this.DeallocationForm.form.markAllAsTouched();
    if (!this.DeallocationForm.form.valid) {
      this.toast.AddToast("Advertencia", "Por favor ingrese todos los campos obligatorios (*)", 10, ToastyType.warning, true);
      return;
    }
    const numeration = this.businessOrder.CurrentDeallocation.Numeration;
    const solo = numeration.match(/^\d+$/); //Numero solo
    const rango = numeration.match(/^\d+([-]\d+)$/);

    if (solo === null && rango === null) {
      Swal.fire("Advertencia", "Solo se permiten los siguientes formatos:  <br/> * Unico (1)  <br/> * Rango (1-6) <br/>", 'warning');
      return;
    }

    this.onActionSave = true;
    this.businessOrder.SaveOrder(this.businessOrder.CurrentDeallocation).then(x => {
      if (x > -1) {
        this.toast.AddToast("Correcto", "Desasignacion Guardada con el numero " + x, 15, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar la desasignación.", 10, ToastyType.success, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionSave = false;
    });
  }

  Finish() {
    this.DeallocationForm.form.markAsUntouched();
    this.modalWindow.hide();
    this.finishEvent.emit(true);
  }

}
