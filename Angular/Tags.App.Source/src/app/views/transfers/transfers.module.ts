import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransfersRoutingModule } from './transfers-routing.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransfersRoutingModule
  ],
  providers: [
    DatePipe
  ]
})
export class TransfersModule { }
