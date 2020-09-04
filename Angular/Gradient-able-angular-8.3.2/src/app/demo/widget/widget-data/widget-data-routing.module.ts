import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WidgetDataComponent} from './widget-data.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetDataRoutingModule { }
