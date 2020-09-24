import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersPTRoutingModule } from './transfers-pt-routing.module';
import { TransfersPTComponent } from './transfers-pt.component';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TransferPtEditModule } from '../transfer-pt-edit/transfer-pt-edit.module';



@NgModule({
  declarations: [TransfersPTComponent],
  imports: [
    CommonModule,
    TransfersPTRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    TransferPtEditModule
  ]  
})
export class TransfersPTModule { }
