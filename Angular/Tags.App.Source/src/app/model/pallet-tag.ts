import { ExternalTag } from './external-tag';

export class PalletTag {
    PalletTagId:number;
    OrderLineId:number;
    PalletNumber: number;
    Quantity:number;
    Batch:string;
    Creation:string;
    CreationDate:Date;
    ExpirationDate:Date;
    RePrint: boolean;
    Edition:string;
    LocationId:number;
    LocationName:string;
    Boxes:ExternalTag[]
}
