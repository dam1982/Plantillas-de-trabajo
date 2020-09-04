import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeLightRoutingModule } from './theme-light-routing.module';
import { ThemeLightComponent } from './theme-light.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {CommonContentModule} from '../common-content/common-content.module';

@NgModule({
  declarations: [ThemeLightComponent],
  imports: [
    CommonModule,
    ThemeLightRoutingModule,
    SharedModule,
    CommonContentModule
  ]
})
export class ThemeLightModule { }
