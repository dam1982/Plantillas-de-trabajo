import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestManagementComponent } from './request-management.component';


const routes: Routes = [
  {
    path: '',
    component: RequestManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestManagementRoutingModule { }
