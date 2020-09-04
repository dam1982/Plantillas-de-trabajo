import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientBusinessService } from './client-business.service';







@NgModule({
  declarations: [
    ClientBusinessService, 

  ],
  imports: [
    CommonModule,
    
    ClientBusinessService,
 
  ],
  exports:[
    ClientBusinessService
  ],
  
})
export class AdministrationModule { }
