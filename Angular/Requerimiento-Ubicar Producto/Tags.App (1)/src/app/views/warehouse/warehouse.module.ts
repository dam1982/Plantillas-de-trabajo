import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AutofocusDirective } from 'src/app/theme/shared/autofocus';
import { TransferPalletComponent } from './transfer-pallet/transfer-pallet.component';
import { DeallocationManagementModule } from './deallocation-management/deallocation-management.module';
import { EnlistmentManagementModule } from './enlistment-management/enlistment-management.module';


@NgModule({
  declarations: [
    TransferPalletComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    EnlistmentManagementModule,
    DeallocationManagementModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    ToastyModule.forRoot()
  ], exports: [
    AutofocusDirective,
  ]
})
export class WarehouseModule { }
