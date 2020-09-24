import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BreadcrumbModule, CardModule, ModalModule } from './components';
import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { TodoListRemoveDirective } from './components/todo/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './components/todo/todo-card-complete.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { ApexChartComponent } from './components/chart/apex-chart/apex-chart.component';
import {ApexChartService} from './components/chart/apex-chart/apex-chart.service';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';
import {ToastService} from './components/toast/toast.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import {LightboxModule} from 'ngx-lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';

/*import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';*/

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    ClickOutsideModule,
    LightboxModule, 
    NgSelectModule,
     NgxDatatableModule,
     ToastyModule.forRoot()
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickOutsideModule,
    ApexChartComponent,
    SpinnerComponent,    
    GalleryComponent,
    ToastComponent,
    NgSelectModule,
    NgxDatatableModule,
    ToastyModule
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent,  
    ToastComponent,
    GalleryComponent,
    ApexChartComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },    
    ApexChartService,
    ToastService
  ]
})
export class SharedModule { }
