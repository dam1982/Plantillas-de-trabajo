import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DeallocationManagementRoutingModule } from './deallocation-management-routing.module';
import { DeallocationManagementComponent } from './deallocation-management.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { DeallocationOrderComponent } from '../deallocation-order/deallocation-order.component';
import { DeallocateComponent } from '../deallocate/deallocate.component';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
  declarations: [DeallocationOrderComponent, DeallocateComponent, DeallocationManagementComponent],
  imports: [
    CommonModule,
    DeallocationManagementRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    FormGroupModule,
    ToastyModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class DeallocationManagementModule { }
