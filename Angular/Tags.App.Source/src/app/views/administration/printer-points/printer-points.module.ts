import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrinterPointsRoutingModule } from './printer-points-routing.module';
import { PrinterPointsComponent } from './printer-points.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
  declarations: [PrinterPointsComponent],
  imports: [
    CommonModule,
    PrinterPointsRoutingModule,
    SharedModule,
    AngularDualListBoxModule,
  ]
})
export class PrinterPointsModule { }
