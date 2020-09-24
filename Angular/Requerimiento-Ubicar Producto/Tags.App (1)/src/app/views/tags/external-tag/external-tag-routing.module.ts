import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalTagComponent } from './external-tag.component';


const routes: Routes = [
  {
    path: '',
    component: ExternalTagComponent
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalTagRoutingModule { }
