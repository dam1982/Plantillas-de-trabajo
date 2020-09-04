import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersCardComponent} from './users-card.component';

const routes: Routes = [
  {
    path: '',
    component: UsersCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersCardRoutingModule { }
