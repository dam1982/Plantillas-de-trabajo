import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullEventCalendarRoutingModule } from './full-event-calendar-routing.module';
import { FullEventCalendarComponent } from './full-event-calendar.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {FormsModule} from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    FullEventCalendarRoutingModule,
    SharedModule,
    FullCalendarModule,
    FormsModule
  ],
  declarations: [FullEventCalendarComponent],
  providers: []
})
export class FullEventCalendarModule { }
