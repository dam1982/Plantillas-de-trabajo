import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversalTagComponent } from './universal-tag.component';


const routes: Routes = [
  {
    path: '',
    component: UniversalTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalTagComponentRoutingModule { }
