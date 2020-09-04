import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./invoice-basic/invoice-basic.module').then(module => module.InvoiceBasicModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('./invoice-summary/invoice-summary.module').then(module => module.InvoiceSummaryModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./invoice-list/invoice-list.module').then(module => module.InvoiceListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
