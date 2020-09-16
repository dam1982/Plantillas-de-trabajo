import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductFilter } from 'src/app/model/product-filter';
import { QueryReturnOrder } from 'src/app/model/query-return-order';
import { TransferPT } from 'src/app/model/transfer-pt';

@Injectable({
  providedIn: 'root'
})
export class ReturnManagementBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) {
  }

  public async GetCustomers(filters: CustomerFilter): Promise<CustomerFilter[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'ReturnManagement', 'GetCustomers');
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
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnManagement', 'GetProducts');
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
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnManagement', 'GetStates');
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


  public GetReturns(filters: any): Promise<QueryReturnOrder[]> {
    let servObj = new ServiceObject("TagsLogic", "ReturnManagement", "GetReturns");
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

  

  public async GetTransfer(returnNumber:number,action:string): Promise<TransferPT> {
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnManagement', 'GetTransfer');
    serviceObj.Data = { returnNumber:returnNumber, action:action};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const transfer = serviceObj.Data as TransferPT;
        return transfer;
      })
      .catch(x => {
        throw x.message;
      });
  }


}
