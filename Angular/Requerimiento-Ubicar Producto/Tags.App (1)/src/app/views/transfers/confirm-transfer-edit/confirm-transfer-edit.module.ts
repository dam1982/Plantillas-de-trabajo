import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmTransferEditComponent } from './confirm-transfer-edit.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [ConfirmTransferEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ConfirmTransferEditComponent]
})
export class ConfirmTransferEditModule { }
