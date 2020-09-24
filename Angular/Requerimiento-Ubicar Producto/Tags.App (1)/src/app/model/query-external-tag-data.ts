import { QueryExternalTagDetails } from './query-external-tag-details';



export class QueryExternalTagData {

    ExternalTagId: number;
    OrderNumber: string;
    CustomerCode: string;
    CustomerName: string;
    ProductName: string;
    ProductCode: string;
    Batch: string;
    CreationDate: string;
    CreationUserDocument:string
    BoxNumber: number;
    UnitMeasure: string;
    PackagesNumber: string;
    PalletNumber: number;
    LocationId: number;
    LocationName: string;
    Confirmed: boolean;
    RePrint: boolean;
    Edition: string;
    Details: QueryExternalTagDetails[];
    BarCode:string;
    Quantity:number;

    public GetBarCode():string
    {
        let result = "";
        result = `${this.BoxNumber}-${this.ExternalTagId}-${this.Batch.split('-')[0]}-${this.Quantity}`;
        return result;
    };
}
