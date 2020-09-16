import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateDataOrderComponent} from '../updatedataorder/updatedataorder.component'


const routes: Routes = [
  {
    path: '',
    component: UpdateDataOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatedataorderRoutingModule { }
