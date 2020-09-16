import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnsRoutingModule } from './returns-routing.module';
import { ReturnManagementModule } from './return-management/return-management.module';
import { ReturnComponent } from './return/return.component';
import { ReturnOrderComponent } from './return-order/return-order.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReturnsRoutingModule,
    ReturnManagementModule
  ]
})
export class ReturnsModule { }
