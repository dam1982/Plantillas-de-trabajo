import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ProductFilter } from 'src/app/model/product-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { QueryMaterialsRequest } from 'src/app/model/query-materials-request';
import { MaterialRequestBusinessService } from './material-request-business.service';

@Injectable({
  providedIn: 'root'
})
export class RequestManagementBusinessService {

  constructor(private apiGatewayService: ApiGatewayService, private materialsBusiness: MaterialRequestBusinessService) {
  }

  public async GetProducts(filters: ProductFilter): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'RequestManagement', 'GetProducts');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const prods = serviceObj.Data as ProductFilter[];
        return prods;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public GetMaterialsRequest(filters: any): Promise<QueryMaterialsRequest[]> {
    var servObj = new ServiceObject("TagsLogic", "RequestManagement", "GetMaterialsRequest");
    servObj.Data = { filters: filters };
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
