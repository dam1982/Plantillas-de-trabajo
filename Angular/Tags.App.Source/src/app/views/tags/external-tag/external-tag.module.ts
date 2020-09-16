import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalTagRoutingModule } from './external-tag-routing.module';
import { TagsModule } from '../tags.module';


@NgModule({
  
  imports: [
    CommonModule,
    ExternalTagRoutingModule,
    TagsModule
  ]
})
export class ExternalTagModule { }
