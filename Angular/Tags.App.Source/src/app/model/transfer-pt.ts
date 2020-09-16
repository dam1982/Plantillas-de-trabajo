import { TransferPTDetails } from './transfer-pt-details';

export class TransferPT {

  constructor(public TransferTypeId: number) {
    this.Details = [];
    this.id = 0;
  }

  id: number;
  SourceWarehouseCode?: string;
  SourceWarehouseName?: string;
  DestinationWarehouseCode?: string;
  DestinationWarehouseName?: string;
  DeliveryDate?: string;
  DeliveryUserDocument?: string;
  DeliveryUserName?: string;
  ReceiptDate?: string;
  ReceiptUserDocument?: string;
  ReceiptUserName?: string;
  StateName?: string;
  Observations?: string;
  Details: TransferPTDetails[];
  DeliveryObservations: string;
  ReceiptObservations: string;

  ReturnOrderId: number;
}


export enum TransferTypes {
  Transfer, Request
}
