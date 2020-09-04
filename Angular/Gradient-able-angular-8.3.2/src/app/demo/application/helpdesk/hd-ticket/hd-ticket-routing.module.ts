import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HdTicketComponent} from './hd-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: HdTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HdTicketRoutingModule { }
