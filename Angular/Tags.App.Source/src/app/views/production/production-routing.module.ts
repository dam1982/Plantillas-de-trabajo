import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'requestManagement',
        loadChildren: () => import('./request-management/request-management.module').then(module => module.RequestManagementModule)
      },
      {
        path: 'materialsRequest',
        loadChildren: () => import('./materials-request/materials-request.module').then(module => module.MaterialsRequestModule)
      },
      {
        path: 'productionMaster',
        loadChildren: () => import('./production-master/production-master.module').then(module => module.ProductionMasterModule)
      },
      {
        path: 'materialsInput',
        loadChildren: () => import('./materials-input/materials-input.module').then(module => module.MaterialsInputModule)
      },
      {
        path: 'tagDelivery',
        loadChildren: () => import('./tag-delivery/tag-delivery.module').then(module => module.TagDeliveryModule)
      },
      {
        path: 'reprintUniversalTag',
        loadChildren: () => import('./reprint-universal-tag/reprint-universal-tag.module').then(module => module.ReprintUniversalTagModule)
      },
      {
        path: 'genericTag',
        loadChildren: () => import('./generic-tag/generic-tag.module').then(module => module.GenericTagModule)
      },
      {
        path: 'locateproduct',
        loadChildren: () => import('./locate-product/locate-product.module').then(module => module.LocateProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
