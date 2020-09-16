import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsRequestRoutingModule } from './materials-request-routing.module';
import { ProductionModule } from '../production.module';



@NgModule({
  
  imports: [
    CommonModule,
    MaterialsRequestRoutingModule, 
    ProductionModule
  ]
})
export class MaterialsRequestModule { }
