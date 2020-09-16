import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { QueryRePrintTag } from 'src/app/model/query-re-print-tag';


@Injectable({
  providedIn: 'root'
})
export class QueryRePrintTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public GetReprintTags(filters: any): Promise<QueryRePrintTag[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryRePrintTag', 'GetReprintTags');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        var query:QueryRePrintTag[] = serviceObj.Data as QueryRePrintTag[];

        query.forEach(x=>
          {
            x.PreviousTagObject =  { Etiqueta:JSON.parse(x.PreviousTag)};
          });

        return query;
      })
      .catch(x => {
        throw x;
      });
  }
}
