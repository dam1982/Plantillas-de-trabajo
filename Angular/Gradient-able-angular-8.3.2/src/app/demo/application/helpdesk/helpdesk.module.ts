import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpdeskRoutingModule } from './helpdesk-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HelpdeskRoutingModule,
    SharedModule
  ]
})
export class HelpdeskModule { }
