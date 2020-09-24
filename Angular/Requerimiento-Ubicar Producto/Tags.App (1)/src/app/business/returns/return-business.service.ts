import { Injectable } from '@angular/core';
import { ReturnOrder } from 'src/app/model/return-order';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { ReturnPackages } from 'src/app/model/return-packages';

@Injectable({
  providedIn: 'root'
})
export class ReturnBusinessService {

  CurrentReturn: ReturnOrder;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentReturn = new ReturnOrder();
  }

  public GetReturn(returnNumber: number): Promise<ReturnOrder> {
    var servObj = new ServiceObject("TagsLogic", "Return", "GetReturn");
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

  public SaveReturn(returnNumber: number, tag: string): Promise<ReturnPackages[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Return', 'SaveReturn');
    serviceObject.Data = { returnNumber, tag };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          const packages = serviceObject.Data as ReturnPackages[];
          this.CurrentReturn.Packages = packages;
          return packages;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public FinishReturn(returnNumber: number, observations: string): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'Return', 'FinishReturn');
    serviceObject.Data = { returnNumber, observations };
    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as boolean;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

}
