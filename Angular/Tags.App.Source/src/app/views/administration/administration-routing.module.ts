import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'printers',
      loadChildren: () => import('./printers/printers.module').then(module => module.PrintersModule)
    },
    {
      path: 'printer-points',
      loadChildren: () => import('./printer-points/printer-points.module').then(module => module.PrinterPointsModule)
    },
    {
      path: 'adminProfile',
      loadChildren: () => import('./profile/profile.module').then(module => module.AdminProfileModule)
    },
    {
      path: 'users',
      loadChildren: () => import('./user/user.module').then(module => module.UserModule)
    },
    {
      path: 'location',
      loadChildren: () => import('./location/location.module').then(module => module.LocationModule)
    },
    {
      path: 'catalog',
      loadChildren: () => import('./catalog/catalog.module').then(module => module.CatalogModule)
    },
    {
      path: 'frame',
      loadChildren: () => import('./frame/frame.module').then(module => module.FrameModule)
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
