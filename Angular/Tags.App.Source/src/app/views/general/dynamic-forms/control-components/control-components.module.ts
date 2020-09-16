import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextControlComponent } from './text-control/text-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchControlComponent } from './switch-control/switch-control.component';
import { SelectListControlComponent } from './select-list-control/select-list-control.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateRangeControlComponent } from './date-range-control/date-range-control.component';
import { CalendarControlComponent } from './calendar-control/calendar-control.component';



@NgModule({
  declarations: [TextControlComponent, SwitchControlComponent, SelectListControlComponent, DateRangeControlComponent, CalendarControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule

  ],
  exports:
    [
      TextControlComponent,
      SwitchControlComponent,
      SelectListControlComponent, CalendarControlComponent,
      NgSelectModule,
      DateRangeControlComponent
    ],
  entryComponents: [TextControlComponent, SwitchControlComponent, SelectListControlComponent, DateRangeControlComponent, CalendarControlComponent],
})
export class ControlComponentsModule { }
