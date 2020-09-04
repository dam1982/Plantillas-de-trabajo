import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'apex',
        loadChildren: () => import('./crt-apex/crt-apex.module').then(module => module.CrtApexModule)
      },
      {
        path: 'chart-js',
        loadChildren: () => import('./crt-chart-js/crt-chart-js.module').then(module => module.CrtChartJsModule)
      },
      {
        path: 'high-chart',
        loadChildren: () => import('./crt-high-chart/crt-high-chart.module').then(module => module.CrtHighChartModule)
      },
      {
        path: 'peity',
        loadChildren: () => import('./crt-peity/crt-peity.module').then(module => module.CrtPeityModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreChartRoutingModule { }
