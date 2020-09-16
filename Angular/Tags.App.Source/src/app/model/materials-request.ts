import { MaterialsRequestDetail } from './materials-request-detail';

export class MaterialsRequest {
    RequestNumber:number=0;
    MaterialsWarehouseCode:string;
    MaterialsWarehouseName:string;
    DestinationWarehouseCode:string;
    DestinationWarehouseName:string;
    CreationDate:Date;
    CreationUserDocument:string;
    CreationUserName:string;
    StateId:number;
    StateName:string;
    Observations:string;
    Details:MaterialsRequestDetail[] = [];
}
