import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class GenericTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public PrintGenericTag(title: string, barCode:string): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "GenericTag", "PrintGenericTag");
    servObj.Data = { title, barCode };
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
