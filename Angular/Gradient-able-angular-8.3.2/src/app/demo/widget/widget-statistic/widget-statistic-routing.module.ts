import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WidgetStatisticComponent} from './widget-statistic.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetStatisticRoutingModule { }
