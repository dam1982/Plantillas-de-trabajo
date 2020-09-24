import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryInternalTagComponent } from './query-internal-tag.component';


const routes: Routes = [
  {
    path: '',
    component: QueryInternalTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryInternalTagRoutingModule { }
