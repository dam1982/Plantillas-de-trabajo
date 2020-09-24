import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransfersPTComponent } from './transfers-pt.component';


const routes: Routes = [
  {
    path: '',
    component: TransfersPTComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersPTRoutingModule { }