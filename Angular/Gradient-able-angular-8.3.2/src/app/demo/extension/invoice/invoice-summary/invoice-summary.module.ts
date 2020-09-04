import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceSummaryRoutingModule } from './invoice-summary-routing.module';
import { InvoiceSummaryComponent } from './invoice-summary.component';
import {SharedModule} from '../../../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InvoiceSummaryRoutingModule,
    SharedModule
  ],
  declarations: [InvoiceSummaryComponent]
})
export class InvoiceSummaryModule { }
