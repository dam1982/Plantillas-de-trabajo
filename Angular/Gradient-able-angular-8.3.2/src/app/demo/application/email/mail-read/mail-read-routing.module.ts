import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MailReadComponent} from './mail-read.component';

const routes: Routes = [
  {
    path: '',
    component: MailReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailReadRoutingModule { }
