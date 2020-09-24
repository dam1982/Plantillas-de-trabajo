import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Order } from 'src/app/model/order';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class InternalTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  GetOrderData(orderNumber: string): Promise<Order> {
    var servObj = new ServiceObject("TagsLogic", "InternalTag", "GetOrder");
    servObj.Data = { orderNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        var result =  Object.assign(new Order(),servObj.Data );
        result.RefineOrderLines();
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }

  GetProductionLines(): Promise<Object[]> {
    var servObj = new ServiceObject("TagsLogic", "InternalTag", "GetProductionLines");
    servObj.Data = {};
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        var result = servObj.Data as Object[];
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }

  SaveTags(order: Order): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "InternalTag", "SaveTags");
    servObj.Data = { order };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        var result = servObj.Data as boolean;
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }
}
