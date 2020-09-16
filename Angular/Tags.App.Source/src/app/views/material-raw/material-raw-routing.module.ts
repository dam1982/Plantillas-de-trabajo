import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inherited-universal-tag',
        loadChildren: () => import('./inherited-universal-tag/inherited-universal-tag.module').then(module => module.InheritedUniversalTagModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRawRoutingModule { }
