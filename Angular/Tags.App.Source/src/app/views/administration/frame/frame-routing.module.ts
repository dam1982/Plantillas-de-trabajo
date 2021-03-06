import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrameComponent} from '../frame/frame.component';


const routes: Routes = [
  {
    path: '',
    component: FrameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameRoutingModule { }
