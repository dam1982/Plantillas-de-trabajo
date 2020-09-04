import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdCustomerListRoutingModule } from './hd-customer-list-routing.module';
import { HdCustomerListComponent } from './hd-customer-list.component';
import {SharedModule} from '../../../../theme/shared/shared.module';

@NgModule({
  declarations: [HdCustomerListComponent],
  imports: [
    CommonModule,
    HdCustomerListRoutingModule,
    SharedModule
  ]
})
export class HdCustomerListModule { }
