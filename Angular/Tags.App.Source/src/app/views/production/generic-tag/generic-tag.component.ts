import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { GenericTagBusinessService } from 'src/app/business/production/generic-tag-business.service';
import { User } from 'src/app/model/user';
import { AppEnviroment } from 'src/app/model/app-enviroment';
@Component({
  selector: 'app-generic-tag',
  templateUrl: './generic-tag.component.html',
  styleUrls: ['./generic-tag.component.scss']
})
export class GenericTagComponent implements OnInit {

  @ViewChild('Form', { static: false }) Form: any;
  @ViewChild('ModalWindow', { static: false }) public modalWindow: any;

  CurrentTitle: string = null;
  CurrentBarCode:string = null;
  onActionPrint: boolean = false;
  user: User;
  today: any = null;

  constructor(private business: GenericTagBusinessService, private toast: ToastService) {
    this.user = AppEnviroment.User;
  }

  ngOnInit() {
  }

  OpenModalPrint() {
    this.Form.form.markAllAsTouched();
    if (this.Form.form.invalid) {
      this.toast.AddToast("Error", "Formulario invalido, por favor complete los campos obligatorios (*)", 10, ToastyType.error, true);
      return false;
    }
    this.today = new Date();
    this.today = this.today.toLocaleString();
    this.modalWindow.show();
  }

  onPrint() {
    this.onActionPrint = true;
    this.business.PrintGenericTag(this.CurrentTitle,this.CurrentBarCode).then(x => {
      if (x) {
        this.toast.AddToast("Información", "Se guardó correctamente el registro.", 10, ToastyType.success, true);
      } else {
        this.toast.AddToast("Error", "No se pudo guardar el registro.", 10, ToastyType.error, true);
      }
      this.Form.reset();
    }).catch(x => {
      Swal.fire('Error', "" + x, 'error');
    }).finally(()=>{
      this.modalWindow.hide();
      this.onActionPrint = false;
    });

  }

}
