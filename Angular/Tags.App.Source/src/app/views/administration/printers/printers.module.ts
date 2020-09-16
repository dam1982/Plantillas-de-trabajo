import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintersRoutingModule } from './printers-routing.module';
import { PrintersComponent } from './printers.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [PrintersComponent],
  imports: [
    CommonModule,
    PrintersRoutingModule,
    SharedModule
  ]
})
export class PrintersModule { }
