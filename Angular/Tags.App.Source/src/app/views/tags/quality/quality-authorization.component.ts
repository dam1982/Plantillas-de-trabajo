import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { QualityAuthorizationBusinessService } from 'src/app/business/tags/quality-authorization-business.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quality-authorization',
  templateUrl: './quality-authorization.component.html',
  styleUrls: ['./quality-authorization.component.scss']
})
export class QualityAuthorizationComponent implements OnInit {



  @Output() authorizedEvent = new EventEmitter<number>();
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  onAction: boolean;
  loginText:string;
  pwdText:string;

  
  constructor(private business: QualityAuthorizationBusinessService) {

  }

  ngOnInit() {
  }

  ValidateAuthorization()
  {
    this.loginForm.form.markAllAsTouched();
    if (this.loginForm.form.invalid) 
      return false;
    this.onAction= true;
    this.business.ValidateAuthorization(this.loginForm.form.value.login,this.loginForm.form.value.pwd).then(x=>{
      this.loginForm.reset();
      this.authorizedEvent.emit(x);      
    }).catch(x=>{
      this.loginForm.reset();
      Swal.fire("Error",x.message, 'error');
    }).finally(()=> this.onAction=false);
  }

  Cancel(){
    this.authorizedEvent.emit(0);
    this.loginForm.reset();
  }

}
