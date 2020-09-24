import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DynamicFormHostComponent } from './dynamic-form-host/dynamic-form-host.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ControlComponentsModule } from '../control-components/control-components.module';



@NgModule({
  declarations: [DynamicFormHostComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlComponentsModule
  ],
  exports: [
    DynamicFormHostComponent
  ],
  providers: [
    DatePipe
  ]
})
export class FormGroupModule { }
