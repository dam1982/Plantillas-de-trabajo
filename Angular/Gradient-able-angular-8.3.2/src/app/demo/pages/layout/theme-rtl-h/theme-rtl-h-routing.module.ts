import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThemeRtlHComponent} from './theme-rtl-h.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeRtlHComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRtlHRoutingModule { }
