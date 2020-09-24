import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbButtonsModule, NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { QueryReturnRoutingModule } from './query-return-routing.module';
import { QueryReturnComponent } from './query-return.component';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [QueryReturnComponent],
  imports: [
    CommonModule,
    QueryReturnRoutingModule,
    SharedModule,
    FormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    FormGroupModule,
    ToastyModule.forRoot()
  ]
})
export class QueryReturnModule { }
