import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RePrintTagRoutingModule } from './re-print-tag-routing.module';
import { TagsModule } from '../tags.module';


@NgModule({
  imports: [
    CommonModule,
    RePrintTagRoutingModule, 
      TagsModule 
  ]
})
export class RePrintTagModule { }
