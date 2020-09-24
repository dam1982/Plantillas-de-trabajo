import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeallocationManagementComponent } from './deallocation-management.component';


const routes: Routes = [
  {
    path: '',
    component: DeallocationManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeallocationManagementRoutingModule { }
