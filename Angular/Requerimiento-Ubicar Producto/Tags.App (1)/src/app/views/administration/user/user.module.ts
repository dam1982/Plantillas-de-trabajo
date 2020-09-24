import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';



import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgSelectModule,
    ToastyModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
