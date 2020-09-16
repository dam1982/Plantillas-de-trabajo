import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { TagDeliveryBusinessService } from 'src/app/business/production/tag-delivery-business.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tag-delivery',
  templateUrl: './tag-delivery.component.html',
  styleUrls: ['./tag-delivery.component.scss']
})
export class TagDeliveryComponent implements OnInit {

  @ViewChild('ValidationForm',{static:false}) validationForm: NgForm;

  CurrentBarCodeMaster:string = "";
  CurrentBarCodeProduct: string = "";
  onActionVerification = false;


  constructor(public business: TagDeliveryBusinessService, private toast: ToastService) {

  }

  ngOnInit() {
  }


  CleanForm(){
    this.CurrentBarCodeMaster = "";
    this.CurrentBarCodeProduct = "";
    this.validationForm.form.markAsUntouched();
  }

  ValidateTags(){
    try {
      if(this.validationForm.invalid){
        this.validationForm.form.markAllAsTouched();
        throw "Por favor complete los campos obligatorios";
      }

      let barCodeVerif = this.CurrentBarCodeMaster.split("!");
      if(barCodeVerif.length !== 4 ){
        throw "Etiqueta master producción con formato incorrecto. Ejemplo: 99090909!101!45!16";
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
      return;
    }

    this.onActionVerification = true;
    this.business.ValidateTags(this.CurrentBarCodeMaster,this.CurrentBarCodeProduct).then(x => {
      this.toast.AddToast("Información", "Se validó correctamente la etiqueta.", 10, ToastyType.success, true);
      this.CurrentBarCodeProduct = null;
      this.validationForm.form.markAsUntouched();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(() => {
      this.onActionVerification = false;
    });
  }
}
