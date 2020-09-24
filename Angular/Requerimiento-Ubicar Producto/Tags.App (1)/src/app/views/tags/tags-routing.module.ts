import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'internalTag',
    loadChildren: () => import('./internal-tag/internal-tag.module').then(module => module.InternalTagModule)
  },
  {
    path: 'externalTag',
    loadChildren: () => import('./external-tag/external-tag.module').then(module => module.ExternalTagModule)
  },
  {
    path: 'palletTag',
    loadChildren: () => import('./pallet-tag/pallet-tag.module').then(module => module.PalletTagModule)
  },
  {
    path: 'reprinttag',
    loadChildren: () => import('./re-print-tag/re-print-tag.module').then(module => module.RePrintTagModule)
  },
  {
    path: 'updateDataOrder',
    loadChildren: () => import('./updatedataorder/updatedataorder.module').then(module => module.UpdateDataOrderModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
