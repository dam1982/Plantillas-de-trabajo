import { Component, OnInit, ViewChild } from '@angular/core';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { UniversalTagPreviewComponent } from '../../universal-tag/universal-tag-preview/universal-tag-preview.component';
import { ReprintUniversalTagBusinessService } from 'src/app/business/production/reprint-universal-tag-business.service';

import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { ReprintUniversalTag } from 'src/app/model/reprint-universal-tag';
import { UniversalTag } from 'src/app/model/universal-tag';
@Component({
  selector: 'app-reprint-universal-tag',
  templateUrl: './reprint-universal-tag.component.html',
  styleUrls: ['./reprint-universal-tag.component.scss']
})
export class ReprintUniversalTagComponent implements OnInit {

  @ViewChild('Form', { static: false }) Form: any;
  optionsTemplateType: KeyValuePair[];
  @ViewChild('PreviewComponent', { static: false }) previewComponent: UniversalTagPreviewComponent;
  CurrentReprintUniversalTag: ReprintUniversalTag = new ReprintUniversalTag();
  CurrentUniversalTag:UniversalTag = null;
  onActionUniversalTag: boolean = false;

  constructor(private business: ReprintUniversalTagBusinessService, private toast: ToastService) { }

  ngOnInit() {
    this.business.GetTemplateType().then(x => {
      this.optionsTemplateType = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    });
  }

  GetUniversalTag() {
    if (!this.CurrentReprintUniversalTag.UniversalTag || this.CurrentReprintUniversalTag.UniversalTag === "") {
      Swal.fire('Error', "Debe ingresar el código de barras etiqueta patrón.", 'error');
      return;
    }

    let parts = this.CurrentReprintUniversalTag.UniversalTag.split("-");
    if (parts.length !== 3) {
      this.toast.AddToast("Error", "Por favor ingrese un codigo de barras válido con formato: 0-0000-0", 10, ToastyType.error, true);
      return;
    }
    this.onActionUniversalTag = true;
    this.business.GetUniversalTag(this.CurrentReprintUniversalTag.UniversalTag).then(x => {
      this.toast.AddToast("Información", "Se obtuvo correctamente el registro.", 10, ToastyType.success, true);
      this.CurrentUniversalTag = x;
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionUniversalTag = false;
    });
  }

  OpenModalPrint() {
    this.Form.form.markAllAsTouched();
    if (this.Form.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }
    if (this.CurrentReprintUniversalTag === null) {
      this.toast.AddToast("Error", "Debe haber encontrado una etiqueta universal válida para continuar ", 10, ToastyType.error, true);
      return false;
    }

    this.CurrentReprintUniversalTag.Quantity = this.CurrentReprintUniversalTag.Quantity;
    this.CurrentReprintUniversalTag.TemplateTypeId = this.CurrentReprintUniversalTag.TemplateTypeId;
    this.previewComponent.LoadComponent(this.CurrentUniversalTag);
  }

  onPrint(event) {
    this.business.ReprintTag(this.CurrentReprintUniversalTag).then(x => {
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
    this.CurrentUniversalTag = null;
    this.CurrentReprintUniversalTag= new ReprintUniversalTag();
    this.Form.reset();
  }
}
