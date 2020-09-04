import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HdCustomerDetailComponent} from './hd-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HdCustomerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdCustomerDetailRoutingModule { }
