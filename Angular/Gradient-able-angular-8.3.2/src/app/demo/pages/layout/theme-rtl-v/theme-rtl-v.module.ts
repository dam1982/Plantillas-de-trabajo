import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRtlVRoutingModule } from './theme-rtl-v-routing.module';
import { ThemeRtlVComponent } from './theme-rtl-v.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeRtlVComponent],
  imports: [
    CommonModule,
    ThemeRtlVRoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeRtlVModule { }
