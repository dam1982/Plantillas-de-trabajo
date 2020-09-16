import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocateProductRoutingModule } from './locate-product-routing.module';
import { LocateProductComponent } from './locate-product.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [LocateProductComponent],
  imports: [
    CommonModule,
    LocateProductRoutingModule,
    SharedModule
  ]
})
export class LocateProductModule { }
