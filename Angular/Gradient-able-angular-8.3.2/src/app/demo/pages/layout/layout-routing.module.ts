import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThemeRtlVModule} from './theme-rtl-v/theme-rtl-v.module';
import {ThemeHorizontalL2Module} from './theme-horizontal-l2/theme-horizontal-l2.module';
import {ThemeRtlHModule} from './theme-rtl-h/theme-rtl-h.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'static',
        loadChildren: () => import('./theme-static/theme-static.module').then(module => module.ThemeStaticModule)
      },
      {
        path: 'fixed',
        loadChildren: () => import('./theme-fixed/theme-fixed.module').then(module => module.ThemeFixedModule)
      },
      {
        path: 'nav-fixed',
        loadChildren: () => import('./theme-nav-fixed/theme-nav-fixed.module').then(module => module.ThemeNavFixedModule)
      },
      {
        path: 'collapse-menu',
        loadChildren: () => import('./theme-collapse-menu/theme-collapse-menu.module').then(module => module.ThemeCollapseMenuModule)
      },
      {
        path: 'vertical-rtl',
        loadChildren: () => import('./theme-rtl-v/theme-rtl-v.module').then(module => module.ThemeRtlVModule)
      },
      {
        path: 'horizontal',
        loadChildren: () => import('./theme-horizontal/theme-horizontal.module').then(module => module.ThemeHorizontalModule)
      },
      {
        path: 'horizontal-l2',
        loadChildren: () => import('./theme-horizontal-l2/theme-horizontal-l2.module').then(module => module.ThemeHorizontalL2Module)
      },
      {
        path: 'horizontal-rtl',
        loadChildren: () => import('./theme-rtl-h/theme-rtl-h.module').then(module => module.ThemeRtlHModule)
      },
      {
        path: 'box',
        loadChildren: () => import('./theme-box/theme-box.module').then(module => module.ThemeBoxModule)
      },
      {
        path: 'light',
        loadChildren: () => import('./theme-light/theme-light.module').then(module => module.ThemeLightModule)
      },
      {
        path: 'dark',
        loadChildren: () => import('./theme-dark/theme-dark.module').then(module => module.ThemeDarkModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
