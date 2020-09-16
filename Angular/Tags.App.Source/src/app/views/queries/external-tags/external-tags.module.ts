import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalTagsRoutingModule } from './external-tags-routing.module';
import { ExternalTagsComponent } from './external-tags.component';
import { FormsModule } from '@angular/forms';
import { NgbButtonsModule, NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ExternalTagsComponent],
  imports: [
    CommonModule,
    ExternalTagsRoutingModule,
    SharedModule,
    FormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    
  ]
})
export class ExternalTagsModule { }
