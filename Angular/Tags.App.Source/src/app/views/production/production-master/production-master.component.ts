import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { ProductionMasterBusinessService } from 'src/app/business/production/production-master-business.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { ProductFilter } from 'src/app/model/product-filter';
import { OrderLine } from 'src/app/model/order-line';

@Component({
  selector: 'app-production-master',
  templateUrl: './production-master.component.html',
  styleUrls: ['./production-master.component.scss']
})
export class ProductionMasterComponent implements OnInit {

  @ViewChild('ProdMasterForm', { static: false }) prodMasterForm: any;

  optionsProductionLines: KeyValuePair[];
  optionsProducts: OrderLine[];
  optionsProductsFilter: ProductFilter[];

  CurrentTypeTag: number;

  onAction: boolean = false;
  onActionOrder: boolean = true;
  PackageNumbersValidation: boolean = false;

  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  onActionPrint: boolean = false;

  @ViewChild('pdfContainer', { static: false })
  pdfContainer: ElementRef;

  onActiveSearch:boolean = false;
  pdfSource:string=null;
  isGenerated: boolean = false;

  constructor(public business: ProductionMasterBusinessService, private toast: ToastService) {
    this.CurrentTypeTag = 0;
  }

  ngOnInit() {
    this.GetOptions();
  }

  ChangeType(type: number) {

    if (this.prodMasterForm.form.touched) {
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
    this.business.ResetProdMaster();
    this.CurrentTypeTag = type;
    this.prodMasterForm.reset();
    this.optionsProducts = [];
    this.optionsProductsFilter =[];
    this.isGenerated = false;
  }



  SaveProductionMaster() {
    this.business.SaveProductionMaster(  this.business.CurrentProdMaster.OrderNumber,this.business.CurrentProdMaster.ProductCode,this.business.CurrentProdMaster.ProductionLineId ).then(x => {
      this.toast.AddToast("Información", "Se guardó correctamente el registro con el número "+x, 10, ToastyType.success, true);

      this.pdfSource = null;
      setTimeout(() => {
        try {
          this.pdfSource = this.business.GetReport(x);
        } catch (error) {
          Swal.fire("Error", "" + error, 'error');
          this.onActiveSearch = false;
        }

      }, 500);
      this.onActiveSearch = true;
      this.isGenerated = true;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  GeneratePdf()
  {
    if (this.prodMasterForm.form.invalid) {
      this.toast.AddToast("Advertencia", "Por favor complete los campos obligatorios (*)", 10, ToastyType.warning, true);
      return;
    }
    if(this.business.CurrentProdMaster.CustomerCode === null){
      this.toast.AddToast("Advertencia", "Por favor busque un numero de orden", 10, ToastyType.warning, true);
      return;
    }
    this.pdfSource = null;
    setTimeout(() => {
      try {
        this.pdfSource = this.business.GetReportPreview(this.business.CurrentProdMaster.OrderNumber,this.business.CurrentProdMaster.ProductCode,this.business.CurrentProdMaster.ProductionLineId);
      } catch (error) {
        Swal.fire("Error", "" + error, 'error');
        this.onActiveSearch = false;
      }

    }, 500);
    this.onActiveSearch = true;
    this.modalWindow.show();
  }

  OnLoadPdf()
  {
    this.onActiveSearch = false;
    this.pdfContainer.nativeElement.scrollIntoView();
  }

  OpenModalPrint() {

    this.prodMasterForm.form.markAllAsTouched();
    if (this.prodMasterForm.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }


    this.modalWindow.show();
  }

  GetOptions() {
    this.business.GetProductionLines().then(x => {
      this.optionsProductionLines = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  SearchOrderNumber(value: string) {
    if (!value || value == "") {
      Swal.fire('Advertencia', "Debe ingresar el número de orden.", 'warning');
      this.prodMasterForm.reset();
      return;
    }
    this.onActionOrder = false;
    this.business.GetOrderData(value).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.optionsProducts = x.OrderLines;
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
        this.optionsProductsFilter = x;
      }).catch(x => {
        Swal.fire('Error', "" + x, 'error');
      }).finally(() => {
        this.onActionOrder = true;
      });
    }
  }

}
