import { Injectable } from '@angular/core';
import { Order } from 'src/app/model/order';
import { RePrintTagComponent } from 'src/app/views/tags/re-print-tag/re-print-tag.component';
import { RePrintTag } from 'src/app/model/re-print-tag';
import { LogPrintTag } from 'src/app/model/log-print-tag';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class RePrintTagServiceService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  GetOrderLocal(orderNumber: string): Promise<Order> {
    var servObj = new ServiceObject("TagsLogic", "RePrintTag", "GetOrderLocal");
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
    var servObj = new ServiceObject("TagsLogic", "RePrintTag", "GetProductionLines");
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

  ReprintTag(rePrint: RePrintTag): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "RePrintTag", "ReprintTag");
    servObj.Data = { rePrint };
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

  /*  SaveLog(LogPrintTag: LogPrintTag): Promise<boolean> {
     var servObj = new ServiceObject("TagsLogic", "RePrintTag", "SaveLog");
     servObj.Data = { LogPrintTag };
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
   } */

}
