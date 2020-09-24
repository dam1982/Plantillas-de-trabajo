import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocationComponent} from '../Location/location.component'


const routes: Routes = [
  {
    path: '',
    component: LocationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
