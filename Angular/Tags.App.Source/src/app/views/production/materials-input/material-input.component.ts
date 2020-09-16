import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { MaterialsInputBusinessService } from 'src/app/business/production/materials-input-business.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { NgForm } from '@angular/forms';
import { MaterialsInput } from 'src/app/model/materials-input';
import { GridMapper } from 'src/app/model/grid-mapper';
import { ProductionMasterMaterial } from 'src/app/model/production-master-material';
import { MaterialDetail } from 'src/app/model/material-detail';
import { MaterialsInputDetails } from 'src/app/model/materials-input-details';

@Component({
  selector: 'app-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.scss']
})
export class MaterialInputComponent implements OnInit {
  @ViewChild('MaterialsInputForm', { static: false }) materialsInputForm: NgForm;
  @ViewChild('MaterialsInputDetailForm', { static: false }) materialsInputDetailForm: NgForm;

  CurrentMaterialsInput: MaterialsInput;
  optionsWorkshifts: KeyValuePair[];
  artCodeVerification: string;


  isArtRequired = null;
  isChargedMaterials = false;
  onActionBarCode: boolean = false;
  onActionBarTag: boolean = false;

  CurrentBarCodeTag: string;
  CurrentQuantity: number;
  CurrentQuantityMax: number = 0;
  gridMapper: GridMapper<ProductionMasterMaterial>;
  gridMapperMaterialDetail: GridMapper<MaterialDetail>;
  itemsQuantity:number = 0;

  @ViewChild('ModalWindowDetail', { static: false }) modalWindowDetail: any;
  @ViewChild('ModalWindowArt', { static: false }) modalWindowArt: any;
  @ViewChild('ChangeArtForm', { static: false }) changeArtForm: NgForm;

  changeArt:any = {};

 constructor(public business: MaterialsInputBusinessService, private toast: ToastService) {
   this.CurrentMaterialsInput = new MaterialsInput();
   this.CurrentMaterialsInput.Details = [];
   this.gridMapper = new GridMapper();
   this.gridMapperMaterialDetail = new GridMapper();
  }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop:'MaterialCode', name:'Cod Material', maxWidth: 160},
      { prop:'MaterialName', name:'Nombre Material' },
      { prop:'EnteredQuantity', name:'Cantidad ingresada', maxWidth:160 },
      { prop:'AccumulatedQuantity', name:'Cantidad Acomulada', maxWidth:160 }
    ]
    this.gridMapperMaterialDetail.Columns = [
      { prop:'MaterialCode', name:'Cod Material', maxWidth: 160},
      { prop:'MaterialName', name:'Nombre Material' },
      { prop:'EnteredQuantity', name:'Cantidad ingresada', maxWidth:160 },
      { prop:'ProductBatch', name:'Lote Producto', maxWidth:160 },
      { prop:'InternalBatchC', name:'Lote C', maxWidth:160 },
      { prop:'InternalBatchP', name:'Lote P', maxWidth:160 },
      { prop:'CreationDate', name:'Fecha', maxWidth:160 },
      { prop:'CreationUserName', name:'Usuario', maxWidth:160 },
    ]
    this.fillFields();
  }

  fillFields() {
    this.business.GetWorkshifts().then(x => {
      this.optionsWorkshifts = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });

   /*  this.businessOrder.GetWarehouses().then(x => {
      this.warehouses = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }); */
  }

  IsArtRequired(value){

    try {
      if (!value || value == "") {
        this.materialsInputForm.reset();
        throw "Debe ingresar la etiqueta master producción para poder buscar.";
      }

      let barCodeVerif = this.CurrentMaterialsInput.BarCodeMaster.split("!");
      if(barCodeVerif.length !== 4 ){
        throw "Etiqueta master producción con formato incorrecto. Ejemplo: 99090909!101!45!16";
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }

    this.onActionBarCode = true;
    this.business.IsArtRequired(value).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.isArtRequired = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionBarCode = false;
    });
  }

  GetMaterials(){


    try {

      if(this.materialsInputForm.invalid){
        this.materialsInputForm.form.markAllAsTouched();
        throw "Por favor complete los campos obligatorios";
      }

      if(this.isArtRequired === null){
        throw "Antes de cargar materiales debe buscar la etiqueta master producción";
      }
      if(this.isArtRequired){
        let artVerif = this.artCodeVerification.split("-");
        let art = this.CurrentMaterialsInput.ArtCode.split("-");
        let isValid = true;
        if( artVerif.length !== 3 || art.length!==4){
          throw "Código con formato incorrecto. Ejemplos: Arte ficha técnica: 808-16-6,  Arte malla: 808-16-6-52";
        }
        artVerif.forEach((x,i)=>{
          if( x !== art[i]){isValid = false;}
        });

        if(!isValid){
          throw "El código arte ficha técnica no coincide con código arte malla. Por favor verifique.";
        }
      }else{
        this.CurrentMaterialsInput.ArtCode = null;
      }


    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }



    this.business.GetMaterials(this.CurrentMaterialsInput.BarCodeMaster,this.CurrentMaterialsInput.TechnicalSheet,this.CurrentMaterialsInput.ArtCode).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.gridMapper.DisplayRows = x;
      this.isChargedMaterials = true;
      this.itemsQuantity = x.length;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }


  ValidateMaterial(value: string){
    try {
      if (!value || value == "") {
        throw "Debe ingresar el código del material para validar la cantidad.";
      }
      if(value.split("-").length !== 3 ){
        throw "Formato inválido del código del material. Ejemplo: 121-2C02002858-120";
      }
      var etiqueta = this.CurrentBarCodeTag.split('-');
      this.CurrentMaterialsInput.Details.forEach(x=>{
        if(parseInt(etiqueta[0]) === x.UniversalTagId){
          let productName = this.gridMapper.DisplayRows.filter(y=>{if(y.MaterialCode === etiqueta[1])return true;})[0].MaterialName;
          throw "El producto con "+productName+" ya se ingresó previamente."
        }
      });
    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }
    this.onActionBarTag=true;
    this.business.ValidateMaterial(this.CurrentMaterialsInput.BarCodeMaster,this.CurrentBarCodeTag).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentQuantityMax = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(()=>{
      this.onActionBarTag=false;
    })
  }


  LoadMaterial(){


    try {
      var etiqueta = this.CurrentBarCodeTag.split('-');

      if(this.materialsInputDetailForm.invalid){
        this.materialsInputDetailForm.form.markAllAsTouched();
        throw "Por favor complete los campos obligatorios";
      }
      if(this.CurrentQuantityMax === 0){
        throw "Primero valide el código material para poder ingresar."
      }
      if(this.CurrentQuantity > this.CurrentQuantityMax){
        throw "La cantidad no puede ser mayor a "+this.CurrentQuantityMax;
      }


    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }

    let foundCod = false;

    this.gridMapper.DisplayRows.forEach(x=>{
      if(x.MaterialCode === etiqueta[1]){
        x.AccumulatedQuantity += this.CurrentQuantity;
        x.EnteredQuantity += this.CurrentQuantity;
        foundCod = true;
      }
    });

    if(foundCod){
      this.toast.AddToast("Información", "Se ingresó correctamente el material", 10, ToastyType.success, true);
      let matDetail = new MaterialsInputDetails();
      matDetail.UniversalTagId = parseInt(etiqueta[0]);
      matDetail.Quantity = this.CurrentQuantity;
      this.CurrentMaterialsInput.Details.push(matDetail);
      this.CurrentQuantityMax = 0;
      this.CurrentQuantity = null;
      this.CurrentBarCodeTag = null;
      this.materialsInputDetailForm.form.markAsUntouched();

    }else{
      this.toast.AddToast("Error", "No se encontró el código del producto, por favor verifique.", 10, ToastyType.error, true);
    }
  }

  GetDetail(){
    this.business.GetDetail(this.CurrentMaterialsInput.BarCodeMaster).then(x => {
      this.modalWindowDetail.show();
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.gridMapperMaterialDetail.DisplayRows = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  OpenModalChangeArt(){

    try {
      if (this.isArtRequired==null) {
        throw "Debe validar la etiqueta master producción para cambiar arte.";
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }

    this.modalWindowArt.show();
  }

  ChangeArtCode(){

    try {
      let artVerif = this.changeArt.Art1.split("-");
      let art = this.changeArt.Art2.split("-");
      let isValid = true;
      if( artVerif.length !== 3 || art.length!==4){
        throw "Código con formato incorrecto. Ejemplos: Arte ficha técnica: 808-16-6,  Arte malla: 808-16-6-52";
      }
      artVerif.forEach((x,i)=>{
        if( x !== art[i]){isValid = false;}
      });

      if(!isValid){
        throw "El código arte ficha técnica no coincide con código arte malla. Por favor verifique.";
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }

    this.business.ChangeArtCode(this.CurrentMaterialsInput.BarCodeMaster,this.changeArt.Art2).then(x => {
      this.toast.AddToast("Información", "Se guardó correctamente el registro.", 10, ToastyType.success, true);
      this.artCodeVerification = this.changeArt.Art1;
      this.CurrentMaterialsInput.ArtCode = this.changeArt.Art2;
      this.CloseModalArt();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  SaveProductionMaster(){
    this.business.SaveProductionMaster(this.CurrentMaterialsInput).then(x => {
      this.toast.AddToast("Información", "Se guardó correctamente el registro con el identificador "+x, 10, ToastyType.success, true);
      this.CleanForms();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });

  }

  CleanForms(){
    this.CurrentBarCodeTag = null;
    this.CurrentMaterialsInput = new MaterialsInput();
    this.CurrentMaterialsInput.Details = [];
    this.gridMapper.DisplayRows = [];
    this.isChargedMaterials = false;
    this.CurrentQuantityMax = 0;
    this.CurrentQuantity = null;
    this.CurrentBarCodeTag = null;
    this.isArtRequired = null;
    this.onActionBarCode = false;
    this.onActionBarTag = false;
    this.materialsInputDetailForm.form.markAsUntouched();
    this.materialsInputForm.form.markAsUntouched();
  }

  CloseModalArt(){
    this.changeArtForm.reset();
    this.modalWindowArt.hide();
  }
}
