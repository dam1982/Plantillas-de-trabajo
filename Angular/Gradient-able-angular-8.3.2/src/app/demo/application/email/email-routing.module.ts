import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mail-inbox',
        loadChildren: () => import('./mail-inbox/mail-inbox.module').then(module => module.MailInboxModule)
      },
      {
        path: 'mail-read',
        loadChildren: () => import('./mail-read/mail-read.module').then(module => module.MailReadModule)
      },
      {
        path: 'mail-compose',
        loadChildren: () => import('./mail-compose/mail-compose.module').then(module => module.MailComposeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
