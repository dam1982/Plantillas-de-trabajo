import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagDeliveryComponent } from './tag-delivery.component';


const routes: Routes = [
  {
    path:'',
    component: TagDeliveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagDeliveryRoutingModule { }
