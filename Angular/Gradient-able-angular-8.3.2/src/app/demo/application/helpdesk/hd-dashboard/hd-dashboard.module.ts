import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdDashboardRoutingModule } from './hd-dashboard-routing.module';
import { HdDashboardComponent } from './hd-dashboard.component';
import {SharedModule} from '../../../../theme/shared/shared.module';

@NgModule({
  declarations: [
    HdDashboardComponent,
  ],
  imports: [
    CommonModule,
    HdDashboardRoutingModule,
    SharedModule
  ]
})
export class HdDashboardModule { }
