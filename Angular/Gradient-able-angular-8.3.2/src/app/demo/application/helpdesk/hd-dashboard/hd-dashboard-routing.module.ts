import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HdDashboardComponent} from './hd-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HdDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdDashboardRoutingModule { }
