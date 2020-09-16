import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { QueryTransferRawMaterial } from 'src/app/model/query-transfer-raw-material';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class TransferManagementBusinessService {


  constructor(private apiGatewayService: ApiGatewayService) {
  }



  public async GetStates(): Promise<Object[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'TransferManagement', 'GetStates');
    serviceObj.Data = {};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;

        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const states = serviceObj.Data as Object[];
        return states;
      }).catch(x => {
        throw x.message;
      });
  }


  public GetTransfers(filters: any): Promise<QueryTransferRawMaterial[]> {
    let servObj = new ServiceObject("TagsLogic", "TransferManagement", "GetTransfers");
    servObj.Data = { filters };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

}
