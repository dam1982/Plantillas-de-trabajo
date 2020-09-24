import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminProfileComponent} from './profile.component'


const routes: Routes = [
  {
    path: '',
    component: AdminProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
