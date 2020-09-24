import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { ExternalTagComponent } from './external-tag/external-tag.component';
import { AutofocusDirective } from 'src/app/theme/shared/autofocus';
import { QualityAuthorizationComponent } from './quality/quality-authorization.component';
import { PalletTagComponent } from './pallet-tag/pallet-tag.component';
import { RePrintTagComponent } from './re-print-tag/re-print-tag.component';
import { InternalTagComponent } from './internal-tag/internal-tag.component';
import { CardTagModule } from './card-tag/card-tag.module';
import { CardTagComponent } from './card-tag/card-tag.component';
import { UpdateDataOrderComponent } from './updatedataorder/updatedataorder.component';


@NgModule({
  declarations: [InternalTagComponent, ExternalTagComponent, 
    AutofocusDirective, 
    QualityAuthorizationComponent,
    PalletTagComponent,
    RePrintTagComponent, CardTagComponent,
    UpdateDataOrderComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    ToastyModule.forRoot()
  ], exports:[
    AutofocusDirective,
    CardTagModule    
  ]
})
export class TagsModule { }


