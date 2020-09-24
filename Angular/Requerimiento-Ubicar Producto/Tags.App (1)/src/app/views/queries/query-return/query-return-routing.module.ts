import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryReturnComponent } from './query-return.component';


const routes: Routes = [{
  path: '',
  component: QueryReturnComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryReturnRoutingModule { }
