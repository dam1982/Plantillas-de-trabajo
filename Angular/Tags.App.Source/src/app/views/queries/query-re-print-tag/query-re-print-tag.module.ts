import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbButtonsModule, NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { QueryRePrintTagRoutingModule } from './query-re-print-tag-routing.module';
import { QueryRePrintTagComponent } from './query-re-print-tag.component';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { ToastyModule } from 'ng2-toasty';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [QueryRePrintTagComponent],
  imports: [
    CommonModule,
    QueryRePrintTagRoutingModule,
    SharedModule,
    FormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    FormGroupModule,
    ToastyModule.forRoot(),
    NgxJsonViewerModule,
  ]
})
export class QueryRePrintTagModule { }
