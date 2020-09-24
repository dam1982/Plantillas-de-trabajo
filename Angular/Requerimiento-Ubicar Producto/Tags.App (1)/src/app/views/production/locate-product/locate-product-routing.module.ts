import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocateProductComponent} from '../locate-product/locate-product.component'


const routes: Routes = [
  {
    path: '',
    component: LocateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocateProductRoutingModule { }
