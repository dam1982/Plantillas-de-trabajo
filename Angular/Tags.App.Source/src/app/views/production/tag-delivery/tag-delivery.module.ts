import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagDeliveryRoutingModule } from './tag-delivery-routing.module';
import { TagDeliveryComponent } from './tag-delivery.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [TagDeliveryComponent],
  imports: [
    CommonModule,
    TagDeliveryRoutingModule,
    SharedModule
  ]
})
export class TagDeliveryModule { }
