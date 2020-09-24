import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnlistmentManagementComponent } from './enlistment-management.component';


const routes: Routes = [{
  path: '',
  component: EnlistmentManagementComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnlistmentManagementRoutingModule { }
