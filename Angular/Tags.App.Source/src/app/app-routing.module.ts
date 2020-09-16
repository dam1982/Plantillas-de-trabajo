import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
    ]
  },


  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./views/administration/administration.module').then(module => module.AdministrationModule)
      },
      {
        path: 'tags',
        loadChildren: () => import('./views/tags/tags.module').then(module => module.TagsModule)
      },
      {
        path: 'queries',
        loadChildren: () => import('./views/queries/queries.module').then(module => module.QueriesModule)
      },
      {
        path: 'transfers',
        loadChildren: () => import('./views/transfers/transfers.module').then(module => module.TransfersModule)
      },
      {
        path: 'material-raw',
        loadChildren: () => import('./views/material-raw/material-raw.module').then(module => module.MaterialRawModule)
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./views/warehouse/warehouse.module').then(module => module.WarehouseModule)
      },
      {
        path: 'returns',
        loadChildren: () => import('./views/returns/returns.module').then(module => module.ReturnsModule)
      },
      {
        path: 'universal-tag',
        loadChildren: () => import('./views/universal-tag/universal-tag.module').then(module => module.UniversalTagModule)
      },     
      {
        path: 'production',
        loadChildren: () => import('./views/production/production.module').then(module => module.ProductionModule)
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
