import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbButtonsModule, NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { QueryLocationsRoutingModule } from './query-locations-routing.module';
import { QueryLocationsComponent } from './query-locations.component';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
  declarations: [QueryLocationsComponent],
  imports: [
    CommonModule,
    QueryLocationsRoutingModule,
    SharedModule,
    FormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    FormGroupModule,
    ToastyModule.forRoot()
  ]
})
export class QueryLocationsModule { }
