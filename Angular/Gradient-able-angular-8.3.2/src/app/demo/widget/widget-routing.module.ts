import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statistic',
        loadChildren: () => import('./widget-statistic/widget-statistic.module').then(module => module.WidgetStatisticModule)
      },
      {
        path: 'data',
        loadChildren: () => import('./widget-data/widget-data.module').then(module => module.WidgetDataModule)
      },
      {
        path: 'chart',
        loadChildren: () => import('./widget-chart/widget-chart.module').then(module => module.WidgetChartModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }
