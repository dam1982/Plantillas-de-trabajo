import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferManagementComponent } from './transfer-management.component';


const routes: Routes = [
  {
    path: '',
    component: TransferManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferManagementRoutingModule { }
