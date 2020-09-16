import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'transfer-pallet',
        loadChildren: () => import('./transfer-pallet/transfer-pallet.module').then(module => module.TransferPalletModule)
      },
      {
        path: 'enlistment-management',
        loadChildren: () => import('./enlistment-management/enlistment-management.module').then(module => module.EnlistmentManagementModule)
      },
      {
        path: 'deallocation-management',
        loadChildren: () => import('./deallocation-management/deallocation-management.module').then(module => module.DeallocationManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
