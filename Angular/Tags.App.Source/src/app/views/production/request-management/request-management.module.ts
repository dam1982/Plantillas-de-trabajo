import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestManagementRoutingModule } from './request-management-routing.module';
import { ProductionModule } from '../production.module';

@NgModule({
  imports: [
    CommonModule,
    RequestManagementRoutingModule,
    ProductionModule
  ]
})
export class RequestManagementModule { }
