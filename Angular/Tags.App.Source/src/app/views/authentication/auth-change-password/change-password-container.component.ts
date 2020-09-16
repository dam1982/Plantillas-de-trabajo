import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserBusiness } from 'src/app/business/administration/user.service';
import { Router } from '@angular/router';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';
import { AppEnviroment } from 'src/app/model/app-enviroment';

@Component({
  selector: 'app-change-password-container',
  templateUrl: './change-password-container.component.html',
  styleUrls: ['./change-password-container.component.scss']
})
export class ChangePasswordContainerComponent implements OnInit {

  currentPwd:string="";
  newPwd1:string="";
  newPwd2:string="";
  names:string= AppEnviroment.User.Names;
  public onAction: boolean= false;
  constructor(private business:UserBusiness,private router: Router,private authBusiness: AuthorizationBusinessService) { }

  ngOnInit() {
  }

  async ChangePassword() {
    try 
    {
      if (!this.currentPwd || !this.newPwd1 || !this.newPwd2)
        throw new Error("Debe ingresar contraseña actual, contraseña nueva y confirmación de contraseña nueva.");
      this.onAction = true;
      await this.business.ChangePassword(this.currentPwd, this.newPwd1, this.newPwd2).then(
        x => {
          Swal.fire('Recordación de Contraseña', "La contraseña se cambió con éxito.", 'info');
          this.currentPwd="";
          this.newPwd1="";
          this.newPwd2="";
          this.router.navigate(['/dashboard/analytics']);
        }
      ).catch(
        x => {
          throw x;
        }
      );
      
    } catch (error) {
      Swal.fire('Error al cambiar Contraseña', error.message, 'error');
    }
    this.onAction = false;
  }

  Cancel()
  {
    this.authBusiness.CloseSession();
  }
}
