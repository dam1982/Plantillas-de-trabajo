import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { ProductFilter } from 'src/app/model/product-filter';
import { UniversalTagBusinessService } from 'src/app/business/universal-tag/universal-tag-business.service';
import { PurchaseOrder } from 'src/app/model/purchase-order';
import { PurchaseOrderProduct } from 'src/app/model/purchase-order-product';
import { UniversalTagPreviewComponent } from '../universal-tag-preview/universal-tag-preview.component';


@Component({
  selector: 'app-universal-tag',
  templateUrl: './universal-tag.component.html',
  styleUrls: ['./universal-tag.component.scss']
})
export class UniversalTagComponent implements OnInit {

  @ViewChild('TagForm', { static: false }) TagForm: any;

  optionsSections: KeyValuePair[];
  optionsWorkshifts: KeyValuePair[];
  optionsWarehouses: WarehouseFilter[];
  optionsLocations: KeyValuePair[];
  optionsTemplateType: KeyValuePair[];
  optionsProducts: any[];

  CurrentPurchaseOrder: PurchaseOrder;
  CurrentProduct: PurchaseOrderProduct;
  CurrentProductFilter: any;
  CurrentTypeTag: number;

  onAction: boolean = false;
  onActionOrder: boolean = true;
  PackageNumbersValidation: boolean = false;

  @ViewChild('PreviewComponent', { static: false }) previewComponent: UniversalTagPreviewComponent;

  constructor(public business: UniversalTagBusinessService, private toast: ToastService) {
    this.CurrentPurchaseOrder = new PurchaseOrder();
    this.CurrentTypeTag = 0;
  }

  ngOnInit() {

    this.GetOptions();

  }

  ChangeType(type: number) {

    if (this.TagForm.form.touched) {
      Swal.fire({
        title: "Confirmar Acción",
        text: "Al cambiar el tipo de etiqueta se perderan los datos actuales ¿Desea continuar?",
        type: 'warning',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: false,
        showCancelButton: true
      }).then((confirm) => {
        let aux = this.CurrentTypeTag;
        this.CurrentTypeTag = null;
        if (confirm.dismiss) {
          setTimeout(() => {
            this.CurrentTypeTag = aux;
          }, 100);
          return;
        } else {
          this.CleanForm(type);
        }
      });
    } else {
      this.CleanForm(type);
    }
  }


  CleanForm(type) {
    this.business.resetTag();
    this.CurrentTypeTag = type;
    this.business.CurrentUniversalTag.TagTypeId = type;
    this.TagForm.reset();
    this.CurrentPurchaseOrder = new PurchaseOrder();
    this.optionsProducts = [];
  }



  onPrint(event) {
    this.business.SaveTags(this.business.CurrentUniversalTag).then(x => {
      if (x) {
        this.toast.AddToast("Información", "Se guardó correctamente el registro con identificador(es) "+x, 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar el registro.", 10, ToastyType.error, true);
      }

      this.previewComponent.modalWindow.hide();
      this.CleanForm(this.CurrentTypeTag);
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(()=>{
      this.previewComponent.onActionPrint = false;
    });
  }

  OpenModalPrint() {

    this.TagForm.form.markAllAsTouched();
    if (this.TagForm.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }



    if (this.business.CurrentUniversalTag.TagTypeId === 2) {
      this.business.CurrentUniversalTag.ProductCode = this.CurrentProductFilter.Code;
      this.business.CurrentUniversalTag.ProductName = this.CurrentProductFilter.Name;
      this.business.CurrentUniversalTag.UnitMeasure = this.CurrentProductFilter.UnitMeasure;
    } else {
      this.business.CurrentUniversalTag.ProductCode = this.CurrentProduct.ProductCode;
      this.business.CurrentUniversalTag.ProductName = this.CurrentProduct.ProductName;
    }

    this.business.CurrentUniversalTag.CreationDate = new Date();

    this.business.CurrentUniversalTag.SectionName = this.optionsSections.filter(x => { return x.Key == this.business.CurrentUniversalTag.SectionId })[0].Value;
    this.business.CurrentUniversalTag.WorkshiftName = this.business.CurrentUniversalTag.WorkshiftId ? this.optionsWorkshifts.filter(x => { return x.Key == this.business.CurrentUniversalTag.WorkshiftId })[0].Value : '';
    this.business.CurrentUniversalTag.WarehouseName = this.optionsWarehouses.filter(x => { return x.Code == this.business.CurrentUniversalTag.WarehouseCode })[0].Name;


    this.previewComponent.LoadComponent(this.business.CurrentUniversalTag);
  }

  GetOptions() {
    this.business.GetSections().then(x => {
      this.optionsSections = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
    this.business.GetWorkshifts().then(x => {
      this.optionsWorkshifts = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
    this.business.GetWarehouses().then(x => {
      this.optionsWarehouses = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
    this.business.GetLocations().then(x => {
      this.optionsLocations = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
    this.business.GetTemplateType().then(x => {
      this.optionsTemplateType = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });

  }

  SearchOrderNumber(value: string) {
    if (!value || value == "") {
      Swal.fire('Advertencia', "Debe ingresar el número de orden.", 'warning');
      this.TagForm.reset();
      return;
    }
    this.onActionOrder = false;
    this.business.GetOrderData(value).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentPurchaseOrder = x;
      this.optionsProducts = x.Products;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionOrder = true;
    });
  }

  SearchProducts(evento: any) {
    let value = evento.target.value;
    if (value.length >= 4) {
      let prodFilter = new ProductFilter();
      prodFilter.Code = value;
      prodFilter.Name = value;
      this.business.GetProducts(prodFilter).then(x => {
        this.toast.AddToast("Información", "Se obtuvo correctamente los registros.", 10, ToastyType.success, true);
        this.optionsProducts = x;
      }).catch(x => {
        Swal.fire('Error', "" + x, 'error');
      }).finally(() => {
        this.onActionOrder = true;
      });
    }

  }

  SearchMastarCode(value: string) {
    if (!value || value == "") {
      Swal.fire('Error', "Debe ingresar el código maestro.", 'error');
      this.ChangeType(1);
      return;
    }
    this.onActionOrder = false;
    this.business.GetMasterProduct(value).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      let prod = new PurchaseOrderProduct();
      prod.ProductName = x.ProductName;
      prod.ProductCode = x.ProductCode;

      this.optionsProducts = [prod];
      this.CurrentProduct = prod;

      this.business.CurrentUniversalTag.ProductionLineName = this.business.CurrentUniversalTag.ProductionLineName ? this.business.CurrentUniversalTag.ProductionLineName : "N/A";
      this.business.CurrentUniversalTag.ProductBatch = this.business.CurrentUniversalTag.ProductBatch ? this.business.CurrentUniversalTag.ProductBatch : "N/A";
      this.business.CurrentUniversalTag.InternalBatchC = this.business.CurrentUniversalTag.InternalBatchC ? this.business.CurrentUniversalTag.InternalBatchC : "N/A";
      this.business.CurrentUniversalTag.InternalBatchP = this.business.CurrentUniversalTag.InternalBatchP ? this.business.CurrentUniversalTag.InternalBatchP : "N/A";


    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionOrder = true;
    });
  }

  VerifyDate(DateInput) {
    var Today = new Date();
    var DateFormat = new Date(DateInput);
    if (Today >= DateFormat) {
      this.business.CurrentUniversalTag.UseBefore = null;
      Swal.fire('Advertencia', "La fecha debe ser mayor o igual a hoy.", 'warning');
    }
  }
}
