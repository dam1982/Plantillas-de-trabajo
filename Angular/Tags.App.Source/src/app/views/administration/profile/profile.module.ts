import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbAccordionModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';

import { AdministrationModule } from '../administration.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ng2-toasty';
import { AdminProfileComponent } from './profile.component';





@NgModule({
  declarations: [AdminProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AdministrationModule,
    NgxDatatableModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
    NgSelectModule,
    ToastyModule
    
  ]
})
export class AdminProfileModule { }
