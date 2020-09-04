import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDarkRoutingModule } from './theme-dark-routing.module';
import { ThemeDarkComponent } from './theme-dark.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeDarkComponent],
  imports: [
    CommonModule,
    ThemeDarkRoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeDarkModule { }
