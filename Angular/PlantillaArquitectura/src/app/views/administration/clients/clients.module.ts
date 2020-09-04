import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdministrationModule } from '../administration.module';



@NgModule({
  
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    AdministrationModule,
    
  ],
  
  declarations: [ClientsComponent],
  providers:[
    
  ]
})
export class ClientsModule { }
