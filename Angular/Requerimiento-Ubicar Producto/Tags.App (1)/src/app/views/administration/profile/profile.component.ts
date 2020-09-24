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
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  @ViewChild("dataTable", { static: false }) dataTable: DatatableComponent;
  formProfile: FormGroup;
  gridMapperProfile: GridMapper<Profile>;
  profileArray: Profile[]
  profile: Profile;
  permisionArray: Permission[];
  objcheck: Permission[];
  resultado: any = {
    "ProfileId": "",
    "ProfileName": "",
    "Permissions": [
    ]
  };
  titulo: string;
  res: any;
  arr: any[];
  per: Permission[];
  profiles: Profile[];
  anular: boolean = false;
  user1: User = new User;

  constructor(private Business: AdminProfileBusiness, private fb: FormBuilder, private toastyService: ToastyService) {
    this.profile = this.resultado;
    this.gridMapperProfile = new GridMapper();
   
   
  }
  ngOnInit() {
    
    this.gridMapperProfile.Columns = [
      { prop: "ProfileId", name: 'Perfil Id' },
      { prop: "ProfileName", name: 'Nombre De Perfil' },
    ];
    this.GetProfiles();
     this.resetFormProfile();
    this.GetPermisions();
    
  }

  async GetProfiles() {
    this.profileArray = await this.Business.GetProfiles({});
    this.gridMapperProfile.DisplayRows = this.profileArray;
  }


  async GetProfile() {
    if (this.gridMapperProfile.SelectedRows.length === 0) {
      Swal.fire('', 'Debe seleccionar un perfil', 'warning');
    }
    else {
      debugger;
      this.anular = true;
      var selectGrid = this.gridMapperProfile.SelectedRows[0].ProfileId
      this.profile = await this.Business.GetProfile(selectGrid);
      this.user1.Profile =
      {
        "ProfileId": "",
        "ProfileName": "",
        "Permissions": [
        ]
      }


      this.user1.Profile.ProfileName = this.profile.ProfileName
      this.user1.Profile.ProfileId = this.profile.ProfileId

      for (var i = 0; i <= this.profile.Permissions.length - 1; i++) {
        let v = this.profile.Permissions[i].toString()
        this.user1.Profile.Permissions.push(v)
      }

      let items = this.permisionArray.map(orden => {
        return this.user1.Profile.Permissions.find(x => x === orden.PermissionId)

      })

      let items2 = items.map(orden => {
        return this.permisionArray.find(x => x.PermissionId === orden)
      });


      var filtered = items2.filter(function (el) {
        return el != null;
      });





      for (var i = 0; i <= filtered.length; i++) {
        if (filtered[i] == null) { break }
        if (filtered[i].PermissionId == filtered[i].PermissionId) {
          filtered[i].checked = true;

        }

      }



      for (var i = 0; i <= this.permisionArray.length - 1; i++) {
        if (filtered[i] == null) { break }
        if (filtered[i].PermissionId == this.permisionArray[i].PermissionId) {
          this.permisionArray[i].checked = true;
        }
      }



      this.groupBy();
    }
  }
  ProfileSave: Profile;
  savepermision: Permission;

  async CreateProfile(value, ProfileId, ProfileName) {

    this.user1.Profile.ProfileId = ProfileId.value;
    this.user1.Profile.ProfileName = ProfileName.value;
    if (this.user1.Profile.Permissions == null || this.user1.Profile.Permissions.length == 0) {
      Swal.fire('', 'Debe seleccionar al menos un permiso', 'warning');
      return null;
    }
    if (this.user1.Profile.ProfileId == "" || this.user1.Profile.ProfileName == "") {
      Swal.fire('', 'Falta llenar datos de Perfil', 'warning');
      return null;
    }

    for (var i = 0; i <= this.profile.Permissions.length - 1; i++) {
      // arreglar   delete  this.profile.Permissions[i].checked;
    }

    var bandera = false;
    bandera = await this.Business.SaveProfile(this.user1.Profile);
    if (bandera == true) {
      this.addToast({ title: 'Operación exitosa', msg: 'Perfil almacenado con exito.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      // Swal.fire('', 'Se ha Agregado el perfil con exito', 'success');

      this.gridMapperProfile.SelectedRows.length = 0;

      this.GetPermisions();

      this.user1 = new User();
      value.hide();


    }
  }
  FilterTableRows(event) {
    this.gridMapperProfile.FilterRows(event.target.value.toLowerCase());
    this.dataTable.offset = 0;
  }

  async GetPermisions() {
    this.anular = false;
    this.permisionArray = await this.Business.GetPermisions();
    this.groupBy();
  }

  groupBy() {
    this.res = this.permisionArray.reduce((acc, item) => {
      acc[item.PermissionName] = [...acc[item.PermissionName] || [], item];   // [item]; 
      return acc;
    }, {});

  }
  resetFormProfile() {
    this.formProfile = this.fb.group({
      ProfileId: [],
      ProfileName: [],
      PermissionId: [],
      checked: [],
      checke2: [],
      PermissionName: [],
      Type: [],
    });
  }

  userCont: User = new User;
  onChange(event, obj: Permission) {

    if (obj.checked === true) {


      this.userCont.Profile =
      {
        "ProfileId": "",
        "ProfileName": "",
        "Permissions": [
        ]
      }

      for (var i = 0; i <= 1; i++) {
        this.userCont.Profile.Permissions.push(obj.PermissionId[0].toString())
        break
      }

      this.user1.Profile.Permissions.push(obj.PermissionId.toString());

    } else {

      for (var i = 0; i <= this.user1.Profile.Permissions.length; i++) {

        if (this.user1.Profile.Permissions[i] == obj.PermissionId[0].toString()) {
          this.user1.Profile.Permissions.splice(i, 1);
        }
        // break
      }
      /*    for(var i = 0; i <= this.profile.Permissions.length ; i++){
            if(this.profile.Permissions[i].PermissionId == obj.PermissionId){
              this.profile.Permissions.splice(i,1);
            }
          }*/

    }

  }
  close(value) {
    this.GetProfiles();
    this.resetFormProfile();
    this.GetPermisions();
    this.profile.ProfileId == null;
    this.profile.ProfileName == null;

    value.hide()
  }


  Edit(value) {

    this.titulo = "Editar Perfil"
    if (this.gridMapperProfile.SelectedRows.length === 0) {
      Swal.fire('', 'Debe seleccionar al menos una fila', 'warning');
    }
    else {
      this.GetProfiles();
      this.resetFormProfile();
      this.GetPermisions();
      this.GetProfile();
      this.anular = true;
      value.show();
    }

  }

  addProfile(value) {

    this.titulo = "Agregar Perfil"

    this.user1.Profile =
    {
      "ProfileId": "",
      "ProfileName": "",
      "Permissions": [
      ]
    }
    // this.profile.ProfileName = "";
    // this.profile.ProfileId ="";
    //  this.profile.Permissions = [];
    this.GetPermisions();

    value.show();
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

}

