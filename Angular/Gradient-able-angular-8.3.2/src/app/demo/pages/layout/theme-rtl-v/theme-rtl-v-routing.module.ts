import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThemeRtlVComponent} from './theme-rtl-v.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeRtlVComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRtlVRoutingModule { }
