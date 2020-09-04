import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetStatisticRoutingModule } from './widget-statistic-routing.module';
import { WidgetStatisticComponent } from './widget-statistic.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {NgbDropdownModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WidgetStatisticComponent],
  imports: [
    CommonModule,
    WidgetStatisticRoutingModule,
    SharedModule,
    CarouselModule,
    NgbProgressbarModule,
    NgbDropdownModule
  ]
})
export class WidgetStatisticModule { }
