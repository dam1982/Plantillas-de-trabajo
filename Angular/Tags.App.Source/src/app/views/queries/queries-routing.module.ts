import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
      path: 'transferFP',
      loadChildren: () => import('./transfers-finished-product/transfers-finished-product.module').then(module => module.TransferPTModule)
    },
    {
      path: 'queryInternalTag',
      loadChildren: () => import('./query-internal-tag/query-internal-tag.module').then(module => module.QueryInternalTagModule)
    },
    {
      path: 'queryExternalTag',
      loadChildren: () => import('./external-tags/external-tags.module').then(module => module.ExternalTagsModule)
    },
    {
      path: 'queryDispatch',
      loadChildren: () => import('./query-dispatch/query-dispatch.module').then(module => module.QueryDispatchModule)
    },
    {
      path: 'queryLocations',
      loadChildren: () => import('./query-locations/query-locations.module').then(module => module.QueryLocationsModule)
    },
    {
      path: 'queryReprintTag',
      loadChildren: () => import('./query-re-print-tag/query-re-print-tag.module').then(module => module.QueryRePrintTagModule)
    },
    {
      path: 'queryReturn',
      loadChildren: () => import('./query-return/query-return.module').then(module => module.QueryReturnModule)
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }
