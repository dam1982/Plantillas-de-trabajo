import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HdCustomerComponent} from './hd-customer.component';

const routes: Routes = [
  {
    path: '',
    component: HdCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdCustomerRoutingModule { }
