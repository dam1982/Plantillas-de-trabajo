import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmTransferComponent } from './confirm-transfer.component';


const routes: Routes =  [
  {
    path: '',
    component: ConfirmTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmTransferRoutingModule { }
