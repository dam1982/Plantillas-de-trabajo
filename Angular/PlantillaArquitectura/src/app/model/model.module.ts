import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from './city';



@NgModule({
  declarations: [
    City

  ],
  imports: [
    CommonModule
  ],
  exports: [
    City
  ]
})
export class ModelModule { }
