import { Component, OnInit, ViewChild } from '@angular/core';

//Objects-------------------------------
import { User, FileObject } from '../../../model/user'
import { Profile } from '../../../model/profile'
import { UserBusiness } from '../../../business/administration/user.service'
//Components----------------------------

import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import Swal from 'sweetalert2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;
  @ViewChild('requestForm', { static: false }) requestForm: NgForm;
  
  
 
  users: User[] = [];
  profiles: Profile[] = [];
  types: string[];
  User: User = new User();

  flatUserSave: boolean;
  flatCheck: boolean;
  flatButtonPassword: boolean = true;
  
  onAction:boolean=false;



  constructor(private Business: UserBusiness, private fb: FormBuilder,  private toast: ToastService) {
    this.GetProfiles();
    this.GetProcesTypes();
  }
  
  ngOnInit() {
    this.GetUsers({});
  }
  async GetUsers(filters) {
    this.users = await this.Business.GetUsers(filters);
  }
  async FillUsers(name) {   
    var filters = {
      "Names": name.value,
      "Document": name.value,
      "ProfileName": name.value,
    }
    this.GetUsers(filters);    
  }
 
  GetUser(id) { 
    this.Business.GetUser(id).then(x=>
    {
      this.User = x;
      this.flatButtonPassword = x.UserId != 0;
    }).catch(x=>
    {
      Swal.fire("Error", x.message, 'error');
    });   
    this.modalWindow.show();
  }

  async GetProfiles() {
    this.profiles = await this.Business.GetProfiles();
  }
  
  async GetProcesTypes() {
    this.types = await this.Business.GetProccessTypes();
  }

  async CheckUser(Check) {
    var Id = Check.id;
    var ch = Check.checked;
    this.flatCheck = await this.Business.InactiveUser(Id, ch);
    if (this.flatCheck == true) {
      this.toast.AddToast("Operación exitosa",  ch ? 'Usuario Activado con éxito.':'Usuario Inactivado con éxito.', 10, ToastyType.success, true);   
     
      return null;
    }
  }

  SaveUser(value) {
    
    this.requestForm.form.markAllAsTouched();
    if (this.requestForm.form.invalid) {
      this.toast.AddToast("Error", "El formulario no ha sido diligenciado correctamente.", 10, ToastyType.error, true);
      return false;
    }

    this.Business.SaveUser(this.User)
    .then(x=> {        
        this.toast.AddToast("Operación exitosa", 'Usuario almacenado con correctamente.', 10, ToastyType.success, true);        
        this.User = x;      
        this.GetUsers({});
        this.modalWindow.hide();
    }).catch(x=> {
      Swal.fire("Error", x.message, 'error');
    }).finally(()=>{
      this.onAction = false;
    });
  }
  
  
  async GenerateNewPaswoord() {
    this.flatUserSave = await this.Business.GeneratePassword(this.User.UserId);
    if (this.flatUserSave == true) {
      this.toast.AddToast("Operación exitosa", 'Se reseteo la contaseña correctamente.', 10, ToastyType.success, true);   
    }
  }
  
  

}
