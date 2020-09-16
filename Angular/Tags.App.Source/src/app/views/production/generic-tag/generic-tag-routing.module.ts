import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericTagComponent } from './generic-tag.component';


const routes: Routes = [
  {
    path:'',
    component:GenericTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericTagRoutingModule { }
