import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthChangePasswordRoutingModule } from './auth-change-password-routing.module';
import { ChangePasswordContainerComponent } from './change-password-container.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [ChangePasswordContainerComponent],
  imports: [
    CommonModule,
    AuthChangePasswordRoutingModule,
    SharedModule,
  ]
})
export class AuthChangePasswordModule { }
