import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvRangeSliderRoutingModule } from './adv-range-slider-routing.module';
import { AdvRangeSliderComponent } from './adv-range-slider.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';

@NgModule({
  declarations: [AdvRangeSliderComponent],
  imports: [
    CommonModule,
    AdvRangeSliderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule
  ]
})
export class AdvRangeSliderModule { }
