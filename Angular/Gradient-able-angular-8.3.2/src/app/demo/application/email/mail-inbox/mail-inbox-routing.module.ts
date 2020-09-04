import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MailInboxComponent} from './mail-inbox.component';

const routes: Routes = [
  {
    path: '',
    component: MailInboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailInboxRoutingModule { }
