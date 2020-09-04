import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeNavFixedRoutingModule } from './theme-nav-fixed-routing.module';
import { ThemeNavFixedComponent } from './theme-nav-fixed.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeNavFixedComponent],
  imports: [
    CommonModule,
    ThemeNavFixedRoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeNavFixedModule { }
