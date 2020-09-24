import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportFileRoutingModule } from './import-file-routing.module';
import { ImportFileComponent } from './import-file.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
  declarations: [ImportFileComponent],
  imports: [
    CommonModule,
    ImportFileRoutingModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  exports: [
    ImportFileComponent
  ]
})
export class ImportFileModule { }
