import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { EnlistmentBoxes } from 'src/app/model/enlistment-boxes';
import { NgForm } from '@angular/forms';
import { DispatchBusinessService } from 'src/app/business/warehouse/dispatch-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { ManualDispatch } from 'src/app/model/manual-dispatch';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {


  @Output() finishEvent = new EventEmitter<boolean>();
  gridMapper: GridMapper<EnlistmentBoxes>;
  @ViewChild('ModalWindowDispatch', { static: false }) modalWindowDispatch: any;
  @ViewChild('Tag', { static: false }) TagInput: ElementRef;
  FieldTag: string;
  onActionConfirm: boolean = false;
  onActionSave: boolean = false;
  clickedConfirm: boolean = false;
  isDispatch: boolean;

  infoQuantity: any;

  ManualDispatchPermission: boolean = false;
  manualDispatchCheck: boolean = false;
  manualDispatchObject: ManualDispatch;
  users: User[] = [];

  constructor(public business: DispatchBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.infoQuantity = new Object();
    this.manualDispatchObject = new ManualDispatch();
    this.ManualDispatchPermission = AppEnviroment.User.Profile.Permissions.indexOf("ManualDispatch") != -1;
  }

  ngOnInit() {
    
  }

  LoadComponent(isDispatch: boolean) {
    this.business.GetUsers().then(x => {
      this.users = x;
    }).catch(x => {
      Swal.fire('Error', "No se pudieron obtener los usuarios" + x, 'warning');
    });
    this.isDispatch = isDispatch;
    this.gridMapper.DisplayRows = this.business.CurrentEnlistment.Boxes;
    this.ReloadBoxes();
    this.ReloadFields();
    this.clickedConfirm = false;
    this.manualDispatchCheckChange();

  }

  manualDispatchCheckChange() {
    let columnCheck = {};
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    this.ReloadBoxes();
    if (this.manualDispatchCheck) {

      this.gridMapper.Columns = [
        { prop: 'BoxNumber', maxWidth: 100, name: "Caja" },
        { prop: 'PalletNumber', maxWidth: 100, name: 'Estiba' },
        { prop: 'LocationName', maxWidth: 150, name: 'Ubicación', canAutoResize: true },
        { prop: 'Quantity', name: 'Cant Unidades' },
        { width: 60, sortable: false, canAutoResize: false, draggable: false, resizeable: false, headerCheckboxable: true, checkboxable: true, cellClass:"checkClass" }
      ];
      this.business.GetEnlistment(this.business.CurrentEnlistment.EnlistmentNumber).then(x=>{
        this.gridMapper.DisplayRows = this.business.CurrentEnlistment.Boxes.filter(x=> {return !x.Dispatched });        
      });
    
    } else {
      this.gridMapper.Columns = [
        { prop: 'BoxNumber', maxWidth: 100, name: "Caja" },
        { prop: 'PalletNumber', maxWidth: 100, name: 'Estiba' },
        { prop: 'LocationName', maxWidth: 150, name: 'Ubicación', canAutoResize: true },
        { prop: 'Quantity', name: 'Cant Unidades' }
      ];
    }
  }

  ReloadBoxes() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
    this.gridMapper.DisplayRows = this.business.CurrentEnlistment.Boxes;
    this.infoQuantity.Items = this.business.CurrentEnlistment.Boxes.length;
    this.infoQuantity.ItemsVerified = this.business.CurrentEnlistment.Boxes.filter(x => { return x.Verified }).length;
    this.infoQuantity.ItemsDispatched = this.business.CurrentEnlistment.Boxes.filter(x => { return x.Dispatched }).length;
    this.infoQuantity.units = 0;
    this.business.CurrentEnlistment.Boxes.forEach(x => { this.infoQuantity.units += x.Quantity; });

  }

  ReloadFields() {
    this.manualDispatchCheck = false;
    this.manualDispatchObject.Observations = "";
    this.FieldTag = "";
  }

  getRowClass(row: EnlistmentBoxes) {
    return { 'green-row': row.Verified && row.Dispatched, 'yellow-row': row.Verified && !row.Dispatched, };
  }

  SaveDispatch() {
    if (this.FieldTag == "") {
      Swal.fire('Advertencia', "Por favor complete el campo de etiqueta antes de confirmar.", 'warning').then(x=> {
        this.TagInput.nativeElement.focus();
      });      
      return false;
    }
    if (this.FieldTag.split('-').length != 1  && this.FieldTag.split('-').length != 4 ) { // Validacion del formato del tag 4-5-58-4 y Estiva 
      Swal.fire('Formato incorrecto', "La etiqueta ingresada no tiene un formato válido.", 'warning').then(x=> {
        this.TagInput.nativeElement.focus();
      });      
      return false;
    }

    this.onActionConfirm = true;
    this.business.SaveDispatch(this.business.CurrentEnlistment.EnlistmentNumber, this.FieldTag, this.isDispatch).then(x => {
      this.ReloadBoxes();
      this.clickedConfirm = true;
      this.toast.AddToast("Éxito", "Se realizó la operación correctamente.", 10, ToastyType.success, true);
      this.FieldTag = "";
      this.TagInput.nativeElement.focus();
    }).catch(x => {
      Swal.fire('Error de etiqueta', "" + x, 'warning').then(x=>{
        this.FieldTag = "";
         this.TagInput.nativeElement.focus();
      });
    }).finally(() => {
      this.onActionConfirm = false;      
    });
  }

  FinishButton() {

    if (this.manualDispatchCheck) {
      this.ManualDispatch();
    } else {
      this.FinishDispatch();
    }

  }

  ManualDispatch() {

    if (this.manualDispatchObject.DispatchUserDocument == null) {
      //this.toast.AddToast("Error", "Por favor seleccione un usuario antes de terminar", 10, ToastyType.error, true);
      Swal.fire('Advertencia', "Por favor seleccione un usuario antes de terminar", 'warning');
      return;
    }
   
    let tagsId = [];
    for (let box of this.gridMapper.SelectedRows) {
      tagsId.push(box.ExternalTagId);
    }

    if (tagsId.length == 0) {
      Swal.fire('Advertencia', "Por favor seleccione al menos una caja para despachar.", 'warning');
      return;
    }

    if (this.manualDispatchObject.Observations == "") {
      Swal.fire('Advertencia', "Por favor complete el campo de observaciones antes de terminar", 'warning');
      return;
    }

    this.manualDispatchObject.ExternalTagsId = tagsId;
    this.manualDispatchObject.EnlistmentNumber = this.business.CurrentEnlistment.EnlistmentNumber;
    this.onActionSave = true;
    this.business.ManualDispatch(this.manualDispatchObject).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se realizó correctamente.", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo terminar el alistamiento", 10, ToastyType.error, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'warning');
    }).finally(() => {
      this.onActionSave = false;
    });
  }

  FinishDispatch() {
    if ( (this.isDispatch && this.infoQuantity.Items != this.infoQuantity.ItemsDispatched) || (!this.isDispatch && this.infoQuantity.Items != this.infoQuantity.ItemsVerified) ) {
      this.toast.AddToast("Advertencia", "Debe verificar todas las cajas para poder Terminar.", 15, ToastyType.error, true);
      return;
    }
    this.onActionSave = true;

    this.business.FinishDispatch(this.business.CurrentEnlistment.EnlistmentNumber, this.manualDispatchObject.Observations, this.isDispatch).then(x => {
      if (x) {
        this.toast.AddToast("Éxito", "Se realizó correctamente.", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo terminar el alistamiento", 10, ToastyType.error, true);
      }
      this.Finish();
    }).catch(x => {
      Swal.fire('Error de etiqueta', "" + x, 'warning');
    }).finally(() => {
      this.onActionSave = false;
    });
  }

  Finish() {
    this.modalWindowDispatch.hide();
    this.clickedConfirm = false;
    this.finishEvent.emit(true);
  }

  OnGridSelect({ selected }) {
    

    this.gridMapper.SelectedRows.splice(0,this.gridMapper.SelectedRows.length);
    this.gridMapper.SelectedRows.push(...selected);
  }

}
