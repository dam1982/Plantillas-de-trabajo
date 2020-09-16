import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRawMaterialComponent } from './transfer-raw-material.component';
import { FormGroupModule } from '../../general/dynamic-forms/form-group/form-group.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormGroupModule
  ]
})
export class TransferRawMaterialModule { }
