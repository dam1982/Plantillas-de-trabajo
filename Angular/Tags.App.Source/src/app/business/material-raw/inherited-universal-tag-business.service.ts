import { Injectable } from '@angular/core';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { ServiceObject } from 'src/app/model/service-object';
import { InheritedUniversalTag } from 'src/app/model/inherited-universal-tag';
import { ApiGatewayService } from '../services/api-gateway.service';
import { UniversalTag } from 'src/app/model/universal-tag';

@Injectable({
  providedIn: 'root'
})
export class InheritedUniversalTagBusinessService {

  public CurrentInheritedUTag: InheritedUniversalTag;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.resetTag();
  }

  resetTag() {
    this.CurrentInheritedUTag = new InheritedUniversalTag();
  }


  public GetTemplateType(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "InheritedUniversalTag", "GetTemplateType");

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
    var servObj = new ServiceObject("TagsLogic", "InheritedUniversalTag", "GetUniversalTag");
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

  public SaveTags(inheritedUniversalTag: InheritedUniversalTag): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'InheritedUniversalTag', 'SaveTags');
    serviceObject.Data = { inheritedUniversalTag };

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
