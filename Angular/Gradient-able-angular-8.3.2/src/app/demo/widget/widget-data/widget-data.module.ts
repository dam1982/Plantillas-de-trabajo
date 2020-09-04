import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetDataRoutingModule } from './widget-data-routing.module';
import { WidgetDataComponent } from './widget-data.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbCarouselModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WidgetDataComponent],
  imports: [
    CommonModule,
    WidgetDataRoutingModule,
    SharedModule,
    NgbProgressbarModule,
    NgbTabsetModule,
    NgbCarouselModule
  ]
})
export class WidgetDataModule { }
