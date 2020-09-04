import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grid',
        loadChildren: () => import('./gallery-grid/gallery-grid.module').then(module => module.GalleryGridModule)
      },
      {
        path: 'masonry',
        loadChildren: () => import('./gallery-masonry/gallery-masonry.module').then(module => module.GalleryMasonryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }

