import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { RequestManagementComponent } from './request-management/request-management.component';
import { MaterialsRequestComponent } from './materials-request/materials-request.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupModule } from '../general/dynamic-forms/form-group/form-group.module';



@NgModule({
  declarations: [RequestManagementComponent,MaterialsRequestComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbAccordionModule,  
    FormGroupModule,     
  ]
})
export class ProductionModule { }
