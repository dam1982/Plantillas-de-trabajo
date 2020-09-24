import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferPalletComponent } from './transfer-pallet.component';


const routes: Routes = [
  {
    path: '',
    component: TransferPalletComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferPalletRoutingModule { }
