import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin-v2',        
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
        path: 'sample-page',
        loadChildren: () => import('./views/demo/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./views/administration/administration.module').then(module => module.AdministrationModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
