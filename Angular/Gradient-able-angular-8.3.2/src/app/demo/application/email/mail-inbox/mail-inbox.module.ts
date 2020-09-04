import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailInboxRoutingModule } from './mail-inbox-routing.module';
import { MailInboxComponent } from './mail-inbox.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MailInboxComponent],
  imports: [
    CommonModule,
    MailInboxRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbDropdownModule
  ]
})
export class MailInboxModule { }
