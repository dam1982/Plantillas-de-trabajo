import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionMasterRoutingModule } from './production-master-routing.module';
import { ProductionMasterComponent } from './production-master.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [ProductionMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductionMasterRoutingModule,
    NgxExtendedPdfViewerModule

  ]
})
export class ProductionMasterModule { }
