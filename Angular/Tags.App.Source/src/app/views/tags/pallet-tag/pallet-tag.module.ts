import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PalletTagRoutingModule } from './pallet-tag-routing.module';

import { TagsModule } from '../tags.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PalletTagRoutingModule,
    TagsModule
  ]
})
export class PalletTagModule { }
