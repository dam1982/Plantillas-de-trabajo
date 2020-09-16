import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryRePrintTagComponent } from './query-re-print-tag.component';



const routes: Routes = [{
  path: '',
  component: QueryRePrintTagComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class QueryRePrintTagRoutingModule { }
