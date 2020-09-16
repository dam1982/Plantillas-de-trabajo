import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialInputComponent } from './material-input.component';


const routes: Routes = [
  {
    path: '',
    component: MaterialInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsInputRoutingModule { }
