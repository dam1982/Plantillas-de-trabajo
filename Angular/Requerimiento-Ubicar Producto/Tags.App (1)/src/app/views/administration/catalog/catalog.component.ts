import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { CatalogValue } from 'src/app/model/catalog-value';
import { CatalogBusinessService } from 'src/app/business/administration/catalog-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { DatatableComponent, id } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {AppEnviroment} from "../../../model/app-enviroment";
import {KeyValuePair} from "../../../model/key-value-pair";
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  gridMapper: GridMapper<CatalogValue>;
  @ViewChild("dataTable", { static: false }) dataTable: DatatableComponent;
  @ViewChild('SwitchTemplate', { static: true }) switchTemplate: TemplateRef<any>;
  @ViewChild('CatalogId', { static: false }) CatalogId: any;
  @ViewChild('PrintForm', { static: false }) PrintForm: any;
  selectTitle : KeyValuePair[];
  catalogValue : CatalogValue =  new CatalogValue();
  flat : boolean;
  constructor(private business: CatalogBusinessService, private toast: ToastService) {  this.GetCatalogs(null); this.ListCatalog(); }
  ngOnInit() {
    this.gridMapper = new GridMapper();
    this.gridMapper.Columns = [
      { prop: 'CatalogId', name: "Catálogo", maxWidth: 300, minWidth: 300, cellTemplate: this.dataTable },
      { prop: 'Title', maxWidth: 250, name: "Título", cellTemplate: this.dataTable },
      { prop: 'Value', maxWidth: 250, name: "Valor", cellTemplate: this.dataTable },
      { prop: 'Description', maxWidth: 250, name: "Descripción", cellTemplate: this.dataTable },
      { prop: 'ValueCode', maxWidth: 250, name: "Code", cellTemplate: this.dataTable },
      { prop: 'Active', maxWidth: 150, name: 'Activo', cellTemplate: this.switchTemplate },
      { prop: 'Creation', maxWidth: 250, name: "Creación", cellTemplate: this.dataTable },
      { prop: 'Edition', maxWidth: 250, name: "Edición", cellTemplate: this.dataTable },
    ]
  }
  GetCatalogs(filter: any) {
  this.business.GetCatalogs(filter).then(x => {
      this.gridMapper.DisplayRows = x;
      }).catch(x => {
        Swal.fire('Error', "" + x, 'error');
      });
    }
  ListCatalog(){
      this.business.GetCatalogList().then(x => {
      this.selectTitle = x;
      }).catch(x => {
        Swal.fire('Error', "" + x, 'error');
      });
  }
  NewLocation(value, Create : boolean,flat : boolean) {
   
    let catalog: CatalogValue = new CatalogValue();
    if (Create == false) {
      this.flat = false;
      if (this.gridMapper.SelectedRows.length == 0){
      Swal.fire('Error', "Elija una fila para continuar" , 'error');
      return null;
    }
      Object.assign(location, this.gridMapper.SelectedRows[0]);
      this.catalogValue.ValueId =  this.gridMapper.SelectedRows[0].ValueId
      this.catalogValue.CatalogId =  this.gridMapper.SelectedRows[0].CatalogId
      this.catalogValue.Title = this.gridMapper.SelectedRows[0].Title
      this.catalogValue.Value = this.gridMapper.SelectedRows[0].Value
      this.catalogValue.ValueNumeric1 = this.gridMapper.SelectedRows[0].ValueNumeric1
      this.catalogValue.ValueNumeric2 = this.gridMapper.SelectedRows[0].ValueNumeric2
      this.catalogValue.Description = this.gridMapper.SelectedRows[0].Description
      this.catalogValue.ValueCode = this.gridMapper.SelectedRows[0].ValueCode
      this.catalogValue.Active = this.gridMapper.SelectedRows[0].Active
      this.catalogValue.Edition = this.gridMapper.SelectedRows[0].Edition
      this.catalogValue.Creation = this.gridMapper.SelectedRows[0].Creation
      this.catalogValue.ValueText = this.gridMapper.SelectedRows[0].ValueText
    } else {
      this.PrintForm.reset();
      this.flat = true;
      var newDate = new Date();
      this.catalogValue.CatalogId = ""
      this.catalogValue.Title = ""
      this.catalogValue.Value = ""
      this.catalogValue.Description = ""
      this.catalogValue.ValueCode = ""
      this.catalogValue.Active = false;
      var TDate = new Date();
      var DateFormat =  TDate.getDate() + "/" + (TDate.getMonth() +1) + "/" + TDate.getFullYear();
      this.catalogValue.Edition =  "(" + DateFormat.toString() + ") " +  AppEnviroment.User.Names  
      this.catalogValue.Creation = this.catalogValue.Edition; 
      this.catalogValue.ValueText = ""
    }
    if (this.gridMapper.DisplayRows == undefined) {
    } else {
    }
    this.gridMapper.SelectedRows = [];
   value.show();
   
  }
SaveCatalog(value,PrintForm){
  this.PrintForm.form.markAllAsTouched();
  if (this.PrintForm.form.invalid) {
    this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
    return false;
  }
  let catalog = new CatalogValue();
  if(this.catalogValue.Creation == ""){
    this.catalogValue.Creation = this.catalogValue.Edition
  }else{this.catalogValue.Creation = this.catalogValue.Creation}
  catalog = {
    ValueId : this.catalogValue.ValueId,
    CatalogId : this.catalogValue.CatalogId,
    Title: this.catalogValue.Title,
    Description: this.catalogValue.Description,
    Value : this.catalogValue.Value,
    ValueCode: this.catalogValue.ValueCode,
    ValueNumeric1: this.catalogValue.ValueNumeric1,
    ValueNumeric2: this.catalogValue.ValueNumeric2,
    ValueText: this.catalogValue.ValueText,
    Creation : this.catalogValue.Creation,
    Edition :  this.catalogValue.Edition,
    Active : this.catalogValue.Active
  }
  this.business.SaveCatalog(catalog).then(x => {
    if (x) {
      this.toast.AddToast("Éxito", "Se guardó correctamente", 10, ToastyType.success, true);
    } else {
      this.toast.AddToast("Error", "No se pudo guardar los datos", 10, ToastyType.error, true);
    }
  }).catch(x => {
    Swal.fire('Error', "" + x, 'error');
  }).finally(() => {
    this.GetCatalogs("");
  });
  value.hide();
  this.PrintForm.reset();
}
}
