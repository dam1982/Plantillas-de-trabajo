import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryDispatchComponent } from './query-dispatch.component';


const routes: Routes =[
  {
    path: '',
    component: QueryDispatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryDispatchRoutingModule { }
