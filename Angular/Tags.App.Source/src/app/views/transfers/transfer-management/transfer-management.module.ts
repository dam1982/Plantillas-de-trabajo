import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferManagementRoutingModule } from './transfer-management-routing.module';
import { TransferManagementComponent } from './transfer-management.component';
import { TransferRawMaterialModule } from '../transfer-raw-material/transfer-raw-material.module';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TransferRawMaterialComponent } from '../transfer-raw-material/transfer-raw-material.component';
import { MaterialRawModule } from '../../material-raw/material-raw.module';


@NgModule({
  declarations: [TransferManagementComponent, TransferRawMaterialComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,
    FormGroupModule,
    TransferRawMaterialModule,
    TransferManagementRoutingModule,
    MaterialRawModule
  ]
})
export class TransferManagementModule { }
