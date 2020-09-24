import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnManagementComponent } from './return-management.component';


const routes: Routes = [
  {
    path: '',
    component: ReturnManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnManagementRoutingModule { }
