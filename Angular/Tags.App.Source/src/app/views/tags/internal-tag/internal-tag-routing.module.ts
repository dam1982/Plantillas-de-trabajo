import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalTagComponent } from './internal-tag.component';


const routes: Routes = [
  {
    path: '',
    component: InternalTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalTagRoutingModule { }
