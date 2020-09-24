import { Component, OnInit } from '@angular/core';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export class FormInput {
  userLogin: any;
  password: any;
}

@Component({
  selector: 'app-auth-signin-v2',
  templateUrl: './auth-signin-v2.component.html',
  styleUrls: ['./auth-signin-v2.component.scss']
})
export class AuthSigninV2Component implements OnInit {
  formInput: FormInput;
  form: any;
  public isSubmit: boolean;
  public onAction: boolean = false;
  
  constructor(private business : AuthorizationBusinessService,
    private router: Router) {
      this.isSubmit = false;

  }

  ngOnInit() {
    this.formInput = {
      userLogin: '',
      password: ''      
    };
  }

  public async Authenticate(form){
    try 
    {
      
      if (!form.valid) {
        this.isSubmit = true;
        return;
      }
      this.onAction = true;
      await this.business.CreateSession(form.value.userLogin, btoa(form.value.password)).then(
        x => {
          //Redirecciona a menú
          this.router.navigate(['/dashboard/analytics']);
        }
      ).catch(
        x => {
          throw x;
        }
      );
    } catch (error) {
      form.reset();
      Swal.fire('Autenticación Fallida', error.message, 'error');
    }
    this.onAction = false;
  }
}
