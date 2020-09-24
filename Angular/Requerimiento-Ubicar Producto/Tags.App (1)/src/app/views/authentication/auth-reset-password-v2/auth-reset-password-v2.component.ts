import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';


@Component({
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss']
})
export class AuthResetPasswordV2Component implements OnInit {
  mail: string;
  public onAction: boolean;
  constructor(private business: AuthorizationBusinessService) {

    this.onAction = false;
  }

  ngOnInit() {
  }

  async RememberPassword() {
    try {
      if (!this.mail)
        throw new Error("Debe ingresar un mail válido");
      this.onAction = true;
      await this.business.RememberPassword(this.mail).then(
        x => {
          Swal.fire('Recordación de Contraseña', x, 'info');
        }
      ).catch(
        x => {
          throw x;
        }
      );
      
    } catch (error) {

      Swal.fire('Recordación de Contraseña', error.message, 'error');
    }
    this.onAction = false;
  }

}
