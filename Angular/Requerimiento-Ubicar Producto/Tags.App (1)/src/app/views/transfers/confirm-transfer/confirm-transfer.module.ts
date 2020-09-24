import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmTransferRoutingModule } from './confirm-transfer-routing.module';
import { ConfirmTransferComponent } from './confirm-transfer.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmTransferEditModule } from '../confirm-transfer-edit/confirm-transfer-edit.module';


@NgModule({
  declarations: [ConfirmTransferComponent],
  imports: [
    CommonModule,
    ConfirmTransferRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    ConfirmTransferEditModule
  ],
})
export class ConfirmTransferModule { }
