import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionMasterModule } from './production-master.module';
import { ProductionMasterComponent } from './production-master.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionMasterRoutingModule { }
