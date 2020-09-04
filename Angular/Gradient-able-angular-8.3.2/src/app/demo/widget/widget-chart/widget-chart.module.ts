import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetChartRoutingModule } from './widget-chart-routing.module';
import { WidgetChartComponent } from './widget-chart.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbDropdownModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {BarRatingModule} from 'ngx-bar-rating';

@NgModule({
  declarations: [WidgetChartComponent],
  imports: [
    CommonModule,
    WidgetChartRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    BarRatingModule
  ]
})
export class WidgetChartModule { }
