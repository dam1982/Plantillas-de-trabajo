import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReprintUniversalTagRoutingModule } from './reprint-universal-tag-routing.module';
import { ReprintUniversalTagComponent } from './reprint-universal-tag.component';
import { UniversalTagComponentModule } from '../../universal-tag/universal-tag-component/universal-tag-component.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ReprintUniversalTagComponent],
  imports: [
    CommonModule,
    ReprintUniversalTagRoutingModule,
    SharedModule,
    UniversalTagComponentModule
  ]
})
export class ReprintUniversalTagModule { }
