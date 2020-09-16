import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MaterialRequestBusinessService } from 'src/app/business/production/material-request-business.service';
import { MaterialsRequestDetail } from 'src/app/model/materials-request-detail';
import { GridMapper } from 'src/app/model/grid-mapper';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { ProductFilter } from 'src/app/model/product-filter';
import Swal from 'sweetalert2';
import { ToastyType, ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-materials-request',
  templateUrl: './materials-request.component.html',
  styleUrls: ['./materials-request.component.scss']
})
export class MaterialsRequestComponent implements OnInit {

  
  @ViewChild('RequestMaterialsForm', { static: false }) RequestMaterialsForm: NgForm;
  @ViewChild('ModalWindow', { static: false }) ModalWindow: any;
  @Output() OnFinishEvent = new EventEmitter<boolean>();
  @ViewChild('ProductSelect', { static: false }) ProductSelect: any;

  materialsWarehouses: WarehouseFilter[] = [];
  destinationWarehouses: WarehouseFilter[] = [];
  products: ProductFilter[];
  materialRequestDetail: MaterialsRequestDetail= new MaterialsRequestDetail();

  gridMapperDetail: GridMapper<MaterialsRequestDetail>;
  minCharsSearch: number = 4;
  onActionSave: boolean = false;
  onAction: boolean = false;

  constructor(public business: MaterialRequestBusinessService, private toast: ToastService) {
    this.gridMapperDetail = new GridMapper();

  }

  ngOnInit() {
    this.gridMapperDetail.Columns = [
      { prop: 'ProductCode', flexGrow: 1, name: "Código" },
      { prop: "ProductName", flexGrow: 2, name: 'Producto' },
      { prop: 'Quantity', flexGrow: 1, name: 'Cantidad' },
    ];
    this.business.GetMaterialWarehouses().then(x => {
      this.materialsWarehouses = x;
    });
    this.business.GetDestinationWarehouses().then(x => {
      this.destinationWarehouses = x;
    });

  }


  LoadComponent() {
    this.materialRequestDetail = new MaterialsRequestDetail();
    this.ModalWindow.show();
    this.gridMapperDetail.DisplayRows = this.business.CurrentMaterialRequest.Details;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }


  GetProducts() {
    let value = this.ProductSelect.searchTerm;
    if (value == null || value.length < this.minCharsSearch)
      return;


    this.business.GetProducts( {Name: value, Code: value}).then(x => {
      this.products = x;
    }).catch(x => {
      Swal.fire('Error', x, 'error');
    });
  }

  AddDetail() {    
    if (!this.materialRequestDetail.Quantity || this.materialRequestDetail.Quantity < 1) {
      Swal.fire('Error', "La cantidad no es válida.", 'error');
      return;
    }
    if (!this.materialRequestDetail.ProductCode) {
      Swal.fire('Error', "Debe seleccionar un producto.", 'error');
      return;
    }
    var duplicate = this.business.CurrentMaterialRequest.Details.filter(x => {
      return x.ProductCode == this.materialRequestDetail.ProductCode
    });
    if (duplicate.length > 0) {
      Swal.fire('Error', "El producto seleccionado ya se encuentra agregado en la requisición.", 'error');
      return;
    }
    this.materialRequestDetail.ProductName = this.ProductSelect.selectedItems[0].label;
    this.business.CurrentMaterialRequest.Details.push(this.materialRequestDetail);
    this.materialRequestDetail = new MaterialsRequestDetail();
    this.gridMapperDetail.DisplayRows = this.business.CurrentMaterialRequest.Details.filter(x => { return x });;
    this.toast.AddToast("Información", "Producto agregado a la requisición.", 10, ToastyType.success, true);
  }

  DelDetail()
  {
    if (this.gridMapperDetail.SelectedRows.length == 0)
      return;

    this.business.CurrentMaterialRequest.Details = this.business.CurrentMaterialRequest.Details.filter(x=> {
      return x.ProductCode != this.gridMapperDetail.SelectedRows[0].ProductCode
    });
    this.gridMapperDetail.DisplayRows = this.business.CurrentMaterialRequest.Details;
  }

  SaveRequest()
  {
    this.RequestMaterialsForm.form.markAllAsTouched();
    if (!this.RequestMaterialsForm.form.valid) {
      this.toast.AddToast("Advertencia", "Por favor ingrese todos los campos obligatorios (*)", 10, ToastyType.warning, true);
      return;
    }
    this.onActionSave = true;
    this.business.SaveMaterialsRequest().then(x=>
      {
        if (x <= 0)
        {                    
          this.toast.AddToast("Error", "No se pudo guardar la requisición.", 10, ToastyType.success, true);
          return;
        }
        
        this.toast.AddToast("Información", "Requisición guardada con el número " + x, 15, ToastyType.success, true);
        this.Finish(true);
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      }).finally(() => {
        this.onActionSave = false;
      });


  }

  Finish(hasChanges) {
    this.RequestMaterialsForm.form.markAsUntouched();
    this.ModalWindow.hide();
    this.OnFinishEvent.emit(hasChanges);
  }

}
