import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversalTagComponentRoutingModule } from './universal-tag-component-routing.module';
import { UniversalTagComponent } from './universal-tag.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UniversalTagPreviewComponent } from '../universal-tag-preview/universal-tag-preview.component';


@NgModule({
  declarations: [UniversalTagComponent,UniversalTagPreviewComponent],
  imports: [
    CommonModule,
    UniversalTagComponentRoutingModule,
    SharedModule,

  ],
  exports: [
    UniversalTagPreviewComponent
  ]
})
export class UniversalTagComponentModule { }
