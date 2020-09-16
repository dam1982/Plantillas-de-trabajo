import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { UniversalTagPreviewComponent } from '../../universal-tag/universal-tag-preview/universal-tag-preview.component';
import { InheritedUniversalTagBusinessService } from 'src/app/business/material-raw/inherited-universal-tag-business.service';
import { UniversalTag } from 'src/app/model/universal-tag';

@Component({
  selector: 'app-inherited-universal-tag',
  templateUrl: './inherited-universal-tag.component.html',
  styleUrls: ['./inherited-universal-tag.component.scss']
})
export class InheritedUniversalTagComponent implements OnInit {

  @ViewChild('Form', { static: false }) Form: any;
  optionsTemplateType: KeyValuePair[];
  @ViewChild('PreviewComponent', { static: false }) previewComponent: UniversalTagPreviewComponent;
  CurrentUniversalTag: UniversalTag = null;
  onActionBarCode: boolean = true;

  constructor(public business: InheritedUniversalTagBusinessService, private toast: ToastService) { }

  ngOnInit() {

    this.business.GetTemplateType().then(x => {
      this.optionsTemplateType = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  GetUniversalTag() {
    if (!this.business.CurrentInheritedUTag.UniversalTagBase || this.business.CurrentInheritedUTag.UniversalTagBase === "") {
      Swal.fire('Error', "Debe ingresar el código de barras etiqueta patrón.", 'error');
      return;
    }

    //let expReg = /^([0-9])+\-([0-9])+\-([0-9])+$/;
    let parts = this.business.CurrentInheritedUTag.UniversalTagBase.split("-");
    if (parts.length !== 3) {
      this.toast.AddToast("Error", "Por favor ingrese un codigo de barras válido con formato: 0-0000-0", 10, ToastyType.error, true);
      return;
    }
    this.onActionBarCode = false;
    this.business.GetUniversalTag(this.business.CurrentInheritedUTag.UniversalTagBase).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentUniversalTag = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionBarCode = true;
    });
  }

  OpenModalPrint() {
    this.Form.form.markAllAsTouched();
    if (this.Form.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }
    if (this.CurrentUniversalTag === null) {
      this.toast.AddToast("Error", "Debe haber encontrado una etiqueta universal válida para continuar ", 10, ToastyType.error, true);
      return false;
    }

    this.CurrentUniversalTag.Quantity = this.business.CurrentInheritedUTag.Quantity;
    this.CurrentUniversalTag.QuantityToPrint = this.business.CurrentInheritedUTag.QuantityToPrint;
    this.CurrentUniversalTag.TemplateTypeId = this.business.CurrentInheritedUTag.TemplateTypeId;



    this.previewComponent.LoadComponent(this.CurrentUniversalTag);
  }

  onPrint(event) {
    this.business.SaveTags(this.business.CurrentInheritedUTag).then(x => {
      if (x) {
        this.toast.AddToast("Información", "Se guardó correctamente el registro.", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar el registro.", 10, ToastyType.error, true);
      }
      this.CleanForm();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(()=>{
      this.previewComponent.modalWindow.hide();
      this.previewComponent.onActionPrint = false;
    });

  }

  CleanForm() {
    this.business.resetTag();

    this.CurrentUniversalTag = null;
    this.Form.reset();
  }
}
