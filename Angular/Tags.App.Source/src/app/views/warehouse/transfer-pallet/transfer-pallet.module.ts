import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferPalletRoutingModule } from './transfer-pallet-routing.module';
import { WarehouseModule } from '../warehouse.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransferPalletRoutingModule,
    WarehouseModule
  ]
})
export class TransferPalletModule { }
