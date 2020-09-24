import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalTagsComponent } from './external-tags.component';


const routes: Routes = [{
  path: '',
  component: ExternalTagsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalTagsRoutingModule { }
