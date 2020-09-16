import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'universal-tag',
      loadChildren: () => import('./universal-tag-component/universal-tag-component.module').then(module => module.UniversalTagComponentModule)
    },
    {
      path: 'universal-external',
      loadChildren: () => import('./universal-external/universal-external.module').then(module => module.UniversalExternalModule)
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalTagRoutingModule { }
