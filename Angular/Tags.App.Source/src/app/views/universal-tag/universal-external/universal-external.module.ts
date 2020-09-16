import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversalExternalRoutingModule } from './universal-external-routing.module';
import { UniversalExternalComponent } from './universal-external.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [UniversalExternalComponent],
  imports: [
    CommonModule,
    UniversalExternalRoutingModule,
    SharedModule
  ]
})
export class UniversalExternalModule { }
