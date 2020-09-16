import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {ReactiveFormsModule} from '@angular/forms';

import { QueryInternalTagRoutingModule } from './query-internal-tag-routing.module';
import { QueryInternalTagComponent } from './query-internal-tag.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { NgbCollapseModule, NgbAccordionModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [QueryInternalTagComponent],
  imports: [
    CommonModule,
    QueryInternalTagRoutingModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    
    ToastyModule.forRoot()
  ],exports: [
    CommonModule,
    FormsModule
  ]
})
export class QueryInternalTagModule { }
