import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductFilter } from 'src/app/model/product-filter';
import { QueryDeallocation } from 'src/app/model/query-deallocation';

@Injectable({
  providedIn: 'root'
})
export class DeallocationManagementBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) {
  }

  public async GetCustomers(filters: CustomerFilter): Promise<CustomerFilter[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'DeallocationManagement', 'GetCustomers');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const customers = serviceObj.Data as CustomerFilter[];
        return customers;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetProducts(filters: ProductFilter): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'DeallocationManagement', 'GetProducts');
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


  public async GetStates(): Promise<Object[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'DeallocationManagement', 'GetStates');
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


  public GetStorageTypes(filters: any): Promise<Object[]> {
    let servObj = new ServiceObject("TagsLogic", "DeallocationManagement", "GetStorageTypes");
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

  public GetDeallocations(filters: any): Promise<QueryDeallocation[]> {
    let servObj = new ServiceObject("TagsLogic", "DeallocationManagement", "GetDeallocations");
    servObj.Data = { filters };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success) {
          throw new Error(x.Message);
        }
        const deallocations = x.Data as QueryDeallocation[];
        return deallocations;
      }).catch(x => {
        throw x;
      });
  }

}
