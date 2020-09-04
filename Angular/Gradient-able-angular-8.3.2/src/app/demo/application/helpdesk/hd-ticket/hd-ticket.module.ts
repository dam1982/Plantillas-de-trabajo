import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdTicketRoutingModule } from './hd-ticket-routing.module';
import { HdTicketComponent } from './hd-ticket.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {TinymceModule} from 'angular2-tinymce';

@NgModule({
  declarations: [HdTicketComponent],
  imports: [
    CommonModule,
    HdTicketRoutingModule,
    SharedModule,
    TinymceModule
  ]
})
export class HdTicketModule { }
