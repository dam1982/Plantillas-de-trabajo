import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersFinishedProductRoutingModule } from './transfers-finished-product-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbAccordionModule, NgbPopoverModule, NgbTooltipModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { TransfersFinishedProductComponent} from './transfers-finished-product.component';


@NgModule({
  declarations: [TransfersFinishedProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TransfersFinishedProductRoutingModule,    
    NgbCollapseModule,
    NgbAccordionModule,
    NgbButtonsModule,
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class TransferPTModule { }
