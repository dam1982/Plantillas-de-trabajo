import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferPtEditComponent } from './transfer-pt-edit.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [TransferPtEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[TransferPtEditComponent]
})
export class TransferPtEditModule { }
