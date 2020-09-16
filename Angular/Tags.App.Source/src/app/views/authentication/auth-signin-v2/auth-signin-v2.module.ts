import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSigninV2RoutingModule } from './auth-signin-v2-routing.module';
import { AuthSigninV2Component } from './auth-signin-v2.component';
import {CustomFormsModule} from 'ng2-validation';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [AuthSigninV2Component],
  imports: [
    CommonModule,
    AuthSigninV2RoutingModule,
    SharedModule,
    CustomFormsModule
    
  ]
})
export class AuthSigninV2Module { }
