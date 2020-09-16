import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnManagementRoutingModule } from './return-management-routing.module';
import { ReturnManagementComponent } from './return-management.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { ReturnComponent } from '../return/return.component';
import { ReturnOrderComponent } from '../return-order/return-order.component';
import { TransferPtEditModule } from '../../transfers/transfer-pt-edit/transfer-pt-edit.module';
import { ConfirmTransferEditModule } from '../../transfers/confirm-transfer-edit/confirm-transfer-edit.module';


@NgModule({
  declarations: [ReturnManagementComponent, ReturnOrderComponent, ReturnComponent],
  imports: [
    CommonModule,
    ReturnManagementRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    FormGroupModule,
    TransferPtEditModule,
    ConfirmTransferEditModule

  ]
})
export class ReturnManagementModule { }
