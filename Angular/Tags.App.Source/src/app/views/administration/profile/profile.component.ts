import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
//objects
import { GridMapper } from '../../../model/grid-mapper'
import { Profile } from '../../../model/profile'
import { Permission } from '../../../model/permission'
//components
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
// services
import { AdminProfileBusiness } from '../../../business/administration/profile.service'



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  @ViewChild("dataTable", { static: false }) dataTable: DatatableComponent;
  @ViewChild('ModalWindow', { static: false }) modalWindow: any;

  formProfile: FormGroup;
  gridMapperProfile: GridMapper<Profile>;

  titulo: string;

  permissions: Permission[];
  groupedPermissions: any;
  profiles: Profile[];
  profile: Profile = new Profile();

  onAction:boolean=false;
  newProfile:boolean=false;

  constructor(private Business: AdminProfileBusiness, private fb: FormBuilder, private toastyService: ToastyService) {
    this.gridMapperProfile = new GridMapper();
  }

  ngOnInit() {

    this.gridMapperProfile.Columns = [
      { prop: "ProfileId", name: 'Perfil Id' },
      { prop: "ProfileName", name: 'Nombre De Perfil' },
    ];
    this.GetProfiles();
    this.GetPermisions();
  }

  async GetProfiles() {
    this.gridMapperProfile.DisplayRows = await this.Business.GetProfiles({});
  }

  async GetPermisions() {
    this.permissions = await this.Business.GetPermisions();
    this.GroupPermissions();
  }


  GroupPermissions() {
    this.groupedPermissions = this.permissions.reduce((acc, item) => {
      acc[item.Type] = [...acc[item.Type] || [], item];   
      return acc;
    }, {});
  }


  async GetProfile() {

    if (this.gridMapperProfile.SelectedRows.length == 0) {
      Swal.fire('', 'Debe seleccionar un perfil', 'warning');
      return null;
    }

    var profileId = this.gridMapperProfile.SelectedRows[0].ProfileId
    try {
      this.profile = await this.Business.GetProfile(profileId);
    } catch (x) {
      Swal.fire("Error", x.message, 'error');
    }
   
    this.ResetPermissions();

    this.profile.Permissions.forEach(x=>{
      var permission = this.permissions.filter(p=>{ return p.PermissionId == x });
      if(permission.length > 0)
        permission[0].checked = true;
    });
    this.newProfile = false;
    this.GroupPermissions();
    this.modalWindow.show();
  }

  
  async SaveProfile() {

    if (this.profile.ProfileId == "" || this.profile.ProfileName == "") {
      Swal.fire('', 'Falta llenar datos de Perfil', 'warning');
      return null;
    }

    this.onAction= true;
    this.profile.Permissions = [];
    this.permissions.filter(x=> { return x.checked}) .forEach(x => {
      this.profile.Permissions.push(x.PermissionId);
     });


    if (this.profile.Permissions.length == 0) {
      Swal.fire('', 'Debe seleccionar al menos un permiso', 'warning').then(x=> this.onAction = false);
     
      return null;
    }

    this.Business.SaveProfile(this.profile).then(x => {
      this.addToast({ title: 'Operación exitosa', msg: 'Perfil almacenado con éxito.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.modalWindow.hide();
      this.ResetPermissions(); 
      this.GetProfiles();     
    }).catch(x => {
      Swal.fire("Error", x.message, 'error');
    }).finally(()=>{
      this.onAction = false;
    });

  }

  

  ResetPermissions()
  {
    this.permissions.forEach(x=> {
      x.checked = false;
    });
  }

  onCheckPermission(event, obj: Permission) {
    var permission = this.permissions.filter(p=>{ return p.PermissionId == obj.PermissionId });
    permission[0].checked = event;
  }
  
  Close() {
    this.modalWindow.hide()
  }


  

  AddProfile() {
    this.profile = new Profile();
    this.titulo = "Agregar Perfil"
    this.ResetPermissions();
    this.newProfile = true;
    this.modalWindow.show();
  }


  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };
    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }


  OnActivate(event) {
    if (event.type === 'dblclick') {
      this.GetProfile();
    }
  }

}

