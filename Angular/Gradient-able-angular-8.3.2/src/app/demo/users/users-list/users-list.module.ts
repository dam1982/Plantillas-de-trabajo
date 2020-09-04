import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class UsersListModule { }
