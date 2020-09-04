import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WidgetChartComponent} from './widget-chart.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetChartRoutingModule { }
