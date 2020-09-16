import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransfersFinishedProductComponent } from './transfers-finished-product.component';


const routes: Routes = [
  {
    path: '',
    component: TransfersFinishedProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersFinishedProductRoutingModule { }
