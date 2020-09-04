import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRtlHRoutingModule } from './theme-rtl-h-routing.module';
import { ThemeRtlHComponent } from './theme-rtl-h.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeRtlHComponent],
  imports: [
    CommonModule,
    ThemeRtlHRoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeRtlHModule { }
