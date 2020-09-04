import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdvRangeSliderComponent} from './adv-range-slider.component';

const routes: Routes = [
  {
    path: '',
    component: AdvRangeSliderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvRangeSliderRoutingModule { }
