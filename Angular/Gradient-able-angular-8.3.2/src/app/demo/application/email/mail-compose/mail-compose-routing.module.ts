import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MailComposeComponent} from './mail-compose.component';

const routes: Routes = [
  {
    path: '',
    component: MailComposeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailComposeRoutingModule { }
