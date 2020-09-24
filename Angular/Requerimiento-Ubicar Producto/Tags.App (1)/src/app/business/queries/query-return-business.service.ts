import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { QueryReturn } from 'src/app/model/query-return';
@Injectable({
  providedIn: 'root'
})
export class QueryReturnBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public GetReturns(filters: any): Promise<QueryReturn[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryReturn', 'GetReturns');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        return serviceObj.Data as QueryReturn[];
      })
      .catch(x => {
        throw x;
      });
  }
}
