import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericTagRoutingModule } from './generic-tag-routing.module';
import { GenericTagComponent } from './generic-tag.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [GenericTagComponent],
  imports: [
    CommonModule,
    GenericTagRoutingModule,
    SharedModule
  ]
})
export class GenericTagModule { }
