import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  GetData(servObject: ServiceObject): Promise<any> {
    return this.apiGatewayService.PostAction(servObject)
      .then(x => {
        servObject = x as ServiceObject;
        if (!servObject.Success) {
          throw new Error(servObject.Message);
        }
        const data = servObject.Data;
        return data;
      })
      .catch(x => {
        throw x;
      });
  }

}
