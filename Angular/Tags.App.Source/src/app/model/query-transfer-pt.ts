import { QueryTransferPTDetails } from './query-transfer-pt-details';
import { QueryExternalTagTotals } from './query-external-tag-totals';
import { QueryInternalTagTotals } from './query-internal-tag-totals';


export class QueryTransferPT {

  Id: number;
  OrderLineId: number;
  OrderNumber: string;
  CustomerName: string;
  CustomerCode: string;
  ProductName: string;
  ProductCode: string;
  TotalQuantity: number;
  TotalItems: number;
  Batch: string;
  DeliveryDate: string;
  PackagesNumber: string;
  SourceWarehouseName: string;
  SourceWarehouseCode: string;
  DestinationWarehouseName: string;
  DestinationWarehouseCode: string;
  DeliveryUserDocument: string;
  DeliveryUserName: string;
  ReceiptDate: string;
  DeliveryDateMax: string;
  DeliveryDateMin: string;
  ReceiptUserDocument: string;
  ReceiptUserName: string;
  StateId: number
  StateName: string;
  DeliveryObservations: string;
  ReceiptObservations: string;
  Details: QueryTransferPTDetails[];
}


export class QueryTransferPTQuery{
  Tranfers: QueryTransferPT[];
  Totals:QueryInternalTagTotals[];
}

