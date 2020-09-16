import { Injectable } from '@angular/core';
import { QueryLocation } from 'src/app/model/query-location';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class QueryLocationsBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public GetQueryLocations(filters: any): Promise<QueryLocation[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryLocations', 'GetQueryLocations');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        return serviceObj.Data as QueryLocation[];
      })
      .catch(x => {
        throw x;
      });
  }
}
