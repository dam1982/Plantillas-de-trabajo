import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class TagDeliveryBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public ValidateTags(barCodeMaster: string,barCodeProduct:string): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "TagDelivery", "ValidateTags");
    servObj.Data = { barCodeMaster, barCodeProduct };
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
