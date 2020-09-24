import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'transfersPT',
        loadChildren: () => import('./transfers-pt/transfers-pt.module').then(module => module.TransfersPTModule)
      },
      {
        path: 'confirmTransfer',
        loadChildren: () => import('./confirm-transfer/confirm-transfer.module').then(module => module.ConfirmTransferModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { }
