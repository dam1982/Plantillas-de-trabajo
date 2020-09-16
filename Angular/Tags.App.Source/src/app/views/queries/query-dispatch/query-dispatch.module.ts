import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryDispatchRoutingModule } from './query-dispatch-routing.module';
import { QueryDispatchComponent } from './query-dispatch.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { ToastyModule } from 'ng2-toasty';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [QueryDispatchComponent],
  imports: [
    CommonModule,
    QueryDispatchRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    FormGroupModule,
    ToastyModule.forRoot(),
    NgxExtendedPdfViewerModule
  ]
})
export class QueryDispatchModule { }
