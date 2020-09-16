import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRawRoutingModule } from './material-raw-routing.module';
import { ConfirmRawMaterialComponent } from './confirm-raw-material/confirm-raw-material.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ConfirmRawMaterialComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialRawRoutingModule
  ],
  exports: [
    ConfirmRawMaterialComponent
  ]
})
export class MaterialRawModule { }
