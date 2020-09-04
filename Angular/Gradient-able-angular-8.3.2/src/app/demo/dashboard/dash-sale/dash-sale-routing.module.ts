import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashSaleComponent} from './dash-sale.component';


const routes: Routes = [
  {
    path: '',
    component: DashSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashSaleRoutingModule { }
