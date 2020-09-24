import { ReturnPackages } from './return-packages';

export class ReturnOrder {

    ReturnNumber: number;
    OrderNumber: string;
    ProductCode: string;
    ProductName: string;
    ReasonId: number;
    ReasonName: string;
    PackagesNumber: string;
    ReturnObservations: string;
    DestinationWarehouseCode: string;
    DestinationWarehouseName: string;
    TransferObservations: string;
    Packages: ReturnPackages[];
}


