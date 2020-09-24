import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalTagRoutingModule } from './internal-tag-routing.module';
import { TagsModule } from '../tags.module';


@NgModule({
 
  imports: [
    CommonModule,
    InternalTagRoutingModule,
    TagsModule
    
  ]
})
export class InternalTagModule { }
