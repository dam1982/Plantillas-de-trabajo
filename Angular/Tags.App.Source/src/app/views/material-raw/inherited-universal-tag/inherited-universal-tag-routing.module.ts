import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InheritedUniversalTagComponent } from './inherited-universal-tag.component';


const routes: Routes = [
  {
    path: '',
    component: InheritedUniversalTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InheritedUniversalTagRoutingModule { }
