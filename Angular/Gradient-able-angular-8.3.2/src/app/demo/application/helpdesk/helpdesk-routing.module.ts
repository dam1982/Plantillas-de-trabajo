import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'hd-dashboard',
        loadChildren: () => import('./hd-dashboard/hd-dashboard.module').then(module => module.HdDashboardModule)
      },
      {
        path: 'hd-customer',
        loadChildren: () => import('./hd-customer/hd-customer.module').then(module => module.HdCustomerModule)
      },
      {
        path: 'hd-customer-list',
        loadChildren: () => import('./hd-customer-list/hd-customer-list.module').then(module => module.HdCustomerListModule)
      },
      {
        path: 'hd-customer-detail',
        loadChildren: () => import('./hd-customer-detail/hd-customer-detail.module').then(module => module.HdCustomerDetailModule)
      },
      {
        path: 'hd-ticket',
        loadChildren: () => import('./hd-ticket/hd-ticket.module').then(module => module.HdTicketModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule { }
