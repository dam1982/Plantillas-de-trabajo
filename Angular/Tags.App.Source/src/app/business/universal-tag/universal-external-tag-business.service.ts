import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class UniversalExternalTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public SaveTags(universalTagsId: number[]): Promise<number> {
    var servObj = new ServiceObject("TagsLogic", "UniversalExternalTag", "SaveTags");
    servObj.Data = { universalTagsId };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public ReprintTags(externalTagId: string,universalTagsId:number[]): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "UniversalExternalTag", "ReprintTags");
    servObj.Data = { externalTagId, universalTagsId };
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
