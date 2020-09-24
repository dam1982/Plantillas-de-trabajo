import { Customer } from './customer';
import { OrderLine } from './order-line';

export class Order {


    OrderNumber: string;
    PurchaseOrderNumber: string;
    Addressee: Customer;
    Customer: Customer;
    OrderLines: OrderLine[];

    RefineOrderLines()
    {
        this.OrderLines.forEach(x=>{
               x.ProductName = `${x.ProductCode}-${x.ProductName}`; 
        });
    }

}
