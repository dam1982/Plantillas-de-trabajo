import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsInputRoutingModule } from './materials-input-routing.module';
import { MaterialInputComponent } from './material-input.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [MaterialInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialsInputRoutingModule
  ]
})
export class MaterialsInputModule { }
