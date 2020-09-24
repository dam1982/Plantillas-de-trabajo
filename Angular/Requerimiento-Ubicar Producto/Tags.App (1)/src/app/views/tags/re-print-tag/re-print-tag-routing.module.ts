import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RePrintTagComponent } from './re-print-tag.component';


const routes: Routes = [
  {
    path: '',
    component: RePrintTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RePrintTagRoutingModule { }
