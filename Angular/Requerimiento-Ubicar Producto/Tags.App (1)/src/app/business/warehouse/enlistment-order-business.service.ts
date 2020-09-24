import { Injectable } from '@angular/core';
import { Enlistment } from 'src/app/model/enlistment';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductFilter } from 'src/app/model/product-filter';
import { ApiGatewayService } from '../services/api-gateway.service';
import { EnlistmentBoxes } from 'src/app/model/enlistment-boxes';

@Injectable({
  providedIn: 'root'
})
export class EnlistmentOrderBusinessService {

  CurrentEnlistment: Enlistment;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentEnlistment = new Enlistment();
  }

  public GetEnlistment(enlistmentNumber: number): Promise<Enlistment> {
    var servObj = new ServiceObject("TagsLogic", "EnlistmentOrder", "GetEnlistment");
    servObj.Data = { enlistmentNumber: enlistmentNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentEnlistment, x.Data);
        return Promise.resolve(this.CurrentEnlistment);
      }).catch(x => {
        throw x;
      });
  }



  public async GetProducts(orderNumber: string): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'EnlistmentOrder', 'GetProducts');
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

  public async GetBoxes(enlistment: Enlistment): Promise<EnlistmentBoxes[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'EnlistmentOrder', 'GetBoxes');
    serviceObj.Data = { enlistment: enlistment };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const prods = serviceObj.Data as EnlistmentBoxes[];
        return prods;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public SaveEnlistment(enlistment: Enlistment): Promise<Enlistment> {
    let serviceObject = new ServiceObject('TagsLogic', 'EnlistmentOrder', 'SaveEnlistment');
    serviceObject.Data = { enlistment: enlistment };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as Enlistment;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }


  public CancelEnlistment(enlistmentNumber: number): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'EnlistmentOrder', 'CancelEnlistment');
    serviceObject.Data = { enlistmentNumber: enlistmentNumber };

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
