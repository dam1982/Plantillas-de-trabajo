import { DeallocationDetail } from './deallocation-detail';

export class Deallocation {

    DeallocationNumber: number;
    OrderNumber: number;
    ProductCode: string;
    ProductName: string;
    ReasonId: number;
    StorageTypeId: number;
    StorageTypeName: string;
    Numeration: string;
    Observations: string;
    Details: DeallocationDetail[];
}
