import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InheritedUniversalTagRoutingModule } from './inherited-universal-tag-routing.module';
import { InheritedUniversalTagComponent } from './inherited-universal-tag.component';
import { UniversalTagPreviewComponent } from '../../universal-tag/universal-tag-preview/universal-tag-preview.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UniversalTagModule } from '../../universal-tag/universal-tag.module';
import { UniversalTagComponentModule } from '../../universal-tag/universal-tag-component/universal-tag-component.module';



@NgModule({
  declarations: [InheritedUniversalTagComponent],
  imports: [
    CommonModule,
    InheritedUniversalTagRoutingModule,
    SharedModule,
    UniversalTagComponentModule

  ]
})
export class InheritedUniversalTagModule { }
