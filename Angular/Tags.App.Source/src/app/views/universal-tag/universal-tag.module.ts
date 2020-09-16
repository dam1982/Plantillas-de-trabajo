import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversalTagRoutingModule } from './universal-tag-routing.module';
import { UniversalTagPreviewComponent } from './universal-tag-preview/universal-tag-preview.component';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UniversalTagComponentModule } from './universal-tag-component/universal-tag-component.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    UniversalTagRoutingModule,
    UniversalTagComponentModule
  ]
})
export class UniversalTagModule { }
