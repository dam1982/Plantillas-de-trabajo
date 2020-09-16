import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversalExternalComponent } from './universal-external.component';


const routes: Routes = [
  {
    path:'',
    component: UniversalExternalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalExternalRoutingModule { }
