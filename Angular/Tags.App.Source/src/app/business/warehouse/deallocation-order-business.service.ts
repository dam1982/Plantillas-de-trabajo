import { Injectable } from '@angular/core';
import { Deallocation } from 'src/app/model/deallocation';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductFilter } from 'src/app/model/product-filter';

@Injectable({
  providedIn: 'root'
})
export class DeallocationOrderBusinessService {

  CurrentDeallocation: Deallocation;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentDeallocation = new Deallocation();
  }

  public GetDeallocation(deallocationNumber: number): Promise<Deallocation> {
    var servObj = new ServiceObject("TagsLogic", "DeallocationOrder", "GetDeallocation");
    servObj.Data = { deallocationNumber: deallocationNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentDeallocation, x.Data);
        return Promise.resolve(this.CurrentDeallocation);
      }).catch(x => {
        throw x;
      });
  }



  public async GetProducts(orderNumber: string): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'DeallocationOrder', 'GetProducts');
    serviceObj.Data = { orderNumber: orderNumber };
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

  public GetReasons(): Promise<Object[]> {
    let servObj = new ServiceObject("TagsLogic", "DeallocationOrder", "GetReasons");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetStorageTypes(): Promise<Object[]> {
    let servObj = new ServiceObject("TagsLogic", "DeallocationOrder", "GetStorageTypes");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public SaveOrder(deallocation: Deallocation): Promise<number> {
    let serviceObject = new ServiceObject('TagsLogic', 'DeallocationOrder', 'SaveOrder');
    serviceObject.Data = { deallocation: deallocation };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as number;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }


  public CancelOrder(deallocationNumber: number): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'DeallocationOrder', 'CancelOrder');
    serviceObject.Data = { deallocationNumber: deallocationNumber };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return true;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }


}
