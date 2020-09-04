import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashSaleRoutingModule } from './dash-sale-routing.module';
import { DashSaleComponent } from './dash-sale.component';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [
    DashSaleComponent
  ],
  imports: [
    CommonModule,
    DashSaleRoutingModule,
    SharedModule
  ]
})
export class DashSaleModule { }
