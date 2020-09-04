import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdCustomerDetailRoutingModule } from './hd-customer-detail-routing.module';
import { HdCustomerDetailComponent } from './hd-customer-detail.component';
import {SharedModule} from '../../../../theme/shared/shared.module';

@NgModule({
  declarations: [HdCustomerDetailComponent],
  imports: [
    CommonModule,
    HdCustomerDetailRoutingModule,
    SharedModule
  ]
})
export class HdCustomerDetailModule { }
