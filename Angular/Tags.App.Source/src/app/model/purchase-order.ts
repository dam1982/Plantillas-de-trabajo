import { PurchaseOrderProduct } from './purchase-order-product';

export class PurchaseOrder {

    PurchaseOrderNumber: string;
    supplierCode: string;
    SupplierName: string;
    Products: PurchaseOrderProduct[];
}
