import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryLocationsComponent } from './query-locations.component';


const routes: Routes =  [{
  path: '',
  component: QueryLocationsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryLocationsRoutingModule { }
