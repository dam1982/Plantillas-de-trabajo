import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThemeHorizontalL2Component} from './theme-horizontal-l2.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeHorizontalL2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeHorizontalL2RoutingModule { }
