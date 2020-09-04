import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailComposeRoutingModule } from './mail-compose-routing.module';
import { MailComposeComponent } from './mail-compose.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {TinymceModule} from 'angular2-tinymce';

@NgModule({
  declarations: [MailComposeComponent],
  imports: [
    CommonModule,
    MailComposeRoutingModule,
    SharedModule,
    NgbCollapseModule,
    TinymceModule
  ]
})
export class MailComposeModule { }
