import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReprintUniversalTagComponent } from './reprint-universal-tag.component';


const routes: Routes = [
  {
    path:'',
    component: ReprintUniversalTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReprintUniversalTagRoutingModule { }
