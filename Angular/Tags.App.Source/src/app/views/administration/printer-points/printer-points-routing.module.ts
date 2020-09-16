import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterPointsComponent } from './printer-points.component';


const routes: Routes = [
  {
    path: '',
    component: PrinterPointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinterPointsRoutingModule { }
