import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PalletTagComponent } from './pallet-tag.component';


const routes: Routes = [
  {
    path: '',
    component: PalletTagComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalletTagRoutingModule { }
