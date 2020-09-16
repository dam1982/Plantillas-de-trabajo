import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordContainerComponent } from './change-password-container.component';


const routes: Routes = [
  {
    path: '',
    component: ChangePasswordContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthChangePasswordRoutingModule { }
