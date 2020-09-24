import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [     
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin-v2/auth-signin-v2.module').then(module => module.AuthSigninV2Module)
      },
      {
        path: 'reset-password-v2',
        loadChildren: () => import('./auth-reset-password-v2/auth-reset-password-v2.module')
          .then(module => module.AuthResetPasswordV2Module)
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

