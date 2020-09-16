import { Injectable } from '@angular/core';
import { ReturnOrder } from 'src/app/model/return-order';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ProductFilter } from 'src/app/model/product-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { TransferPT } from 'src/app/model/transfer-pt';

@Injectable({
  providedIn: 'root'
})
export class ReturnOrderBusinessService {

  CurrentReturn: ReturnOrder;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentReturn = new ReturnOrder();
  }

  public GetReturn(returnNumber: number): Promise<ReturnOrder> {
    var servObj = new ServiceObject("TagsLogic", "ReturnOrder", "GetReturn");
    servObj.Data = { returnNumber: returnNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentReturn, x.Data);
        return Promise.resolve(this.CurrentReturn);
      }).catch(x => {
        throw x;
      });
  }



  public async GetProducts(orderNumber: string): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnOrder', 'GetProducts');
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

  public async GetReasons(): Promise<Object[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnOrder', 'GetReasons');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const reasons = serviceObj.Data as Object[];
        return reasons;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetWarehouses(): Promise<WarehouseFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ReturnOrder', 'GetWarehouses');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const warehouses = serviceObj.Data as WarehouseFilter[];

        return warehouses;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public SaveOrder(returnOrder: ReturnOrder): Promise<number> {
    let serviceObject = new ServiceObject('TagsLogic', 'ReturnOrder', 'SaveOrder');
    serviceObject.Data = { returnOrder };

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


  public CancelOrder(returnNumber: number): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'ReturnOrder', 'CancelOrder');
    serviceObject.Data = { returnNumber };

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
