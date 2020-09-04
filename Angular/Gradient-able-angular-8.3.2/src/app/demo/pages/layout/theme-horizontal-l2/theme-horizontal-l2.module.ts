import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeHorizontalL2RoutingModule } from './theme-horizontal-l2-routing.module';
import { ThemeHorizontalL2Component } from './theme-horizontal-l2.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeHorizontalL2Component],
  imports: [
    CommonModule,
    ThemeHorizontalL2RoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeHorizontalL2Module { }
