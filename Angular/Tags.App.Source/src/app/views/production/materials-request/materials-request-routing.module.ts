import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsRequestComponent } from './materials-request.component';


const routes: Routes =[
  {
    path: '',
    component: MaterialsRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRequestRoutingModule { }
