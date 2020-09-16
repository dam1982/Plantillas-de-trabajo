import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnlistmentManagementRoutingModule } from './enlistment-management-routing.module';
import { EnlistmentManagementComponent } from './enlistment-management.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { EnlistmentOrderComponent } from '../enlistment-order/enlistment-order.component';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
  declarations: [EnlistmentManagementComponent, EnlistmentOrderComponent, DispatchComponent],
  imports: [
    CommonModule,
    EnlistmentManagementRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    FormGroupModule,
    ToastyModule.forRoot()
  ]
})
export class EnlistmentManagementModule { }
