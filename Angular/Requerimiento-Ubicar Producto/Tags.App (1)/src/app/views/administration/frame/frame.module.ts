import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameRoutingModule } from './frame-routing.module';
import { FrameComponent } from './frame.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [FrameComponent],
  imports: [
    CommonModule,
    FrameRoutingModule,
    SharedModule
  ]
})
export class FrameModule { }
