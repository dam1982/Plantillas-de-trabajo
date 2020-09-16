import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintersComponent } from './printers.component';


const routes: Routes = [{
  path: '',
  component: PrintersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule { }
