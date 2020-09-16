import { TransferTypes } from './transfer-pt';
import { TransferRawMaterialDetail } from './transfer-raw-material-detail';

export class TransferRawMaterial {

    TransferNumber: number;
    SourceWarehouseCode: string;
    SourceWarehouseName: string;
    DestinationWarehouseCode: string;
    DestinationWarehouseName: string;
    StateId: number;
    CreationDate: string;
    Delivery: string;
    DeliveryObservations: string;
    Receipt: string;
    ReceiptObservations: string;
    TransferTypeId: TransferTypes;
    RequestNumber: number;
    RequestObservations: string;
    Details: TransferRawMaterialDetail[];

}


