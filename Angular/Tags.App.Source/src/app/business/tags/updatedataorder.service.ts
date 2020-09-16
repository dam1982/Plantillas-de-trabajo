import { Injectable } from '@angular/core';
import {Order} from '../../model/order'
import {ServiceObject} from '../../model/service-object'
import {ApiGatewayService} from '../../business/services/api-gateway.service'

@Injectable({
  providedIn: 'root'
})
export class  UpdateDataOrderBusiness {
  
  
  
  constructor(private ApiGatewayService : ApiGatewayService) { }

  GetOrders(orderNumber: string): Promise<Order[]> {
    var servObj = new ServiceObject("TagsLogic","UpdateDataOrder","GetOrders");
      servObj.Data = { orderNumber: orderNumber };
      return this.ApiGatewayService.PostAction(servObj)
          .then(x => {
              servObj = <ServiceObject>x;
              if (!servObj.Success)
                  throw new Error(servObj.Message);

                  return Promise.resolve(<Order[]>servObj.Data);
          })
          .catch(x => {
              throw x.message;
          });

}

UpdateOrder(orderNumber: string, observations : string): Promise<string> {
  var servObj = new ServiceObject("TagsLogic","UpdateDataOrder","UpdateOrder");
    servObj.Data = { orderNumber: orderNumber,observations : observations };
    
    return this.ApiGatewayService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            if (!servObj.Success)
                throw new Error(servObj.Message);

            return <string>servObj.Data;
        })
        .catch(x => {
            throw x;
        });

}
}
