import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { ServiceObject } from 'src/app/model/service-object';
import { UniversalTag } from 'src/app/model/universal-tag';
import { ReprintUniversalTag } from 'src/app/model/reprint-universal-tag';

@Injectable({
  providedIn: 'root'
})
export class ReprintUniversalTagBusinessService {

  constructor(private apiGatewayService:ApiGatewayService) { }

  public GetTemplateType(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "ReprintUniversalTag", "GetTemplateType");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetUniversalTag(barCode: string): Promise<UniversalTag> {
    var servObj = new ServiceObject("TagsLogic", "ReprintUniversalTag", "GetUniversalTag");
    servObj.Data = { barCode };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public ReprintTag(reprintUniversalTag: ReprintUniversalTag): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "ReprintUniversalTag", "ReprintTag");
    servObj.Data = { reprintUniversalTag };
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
