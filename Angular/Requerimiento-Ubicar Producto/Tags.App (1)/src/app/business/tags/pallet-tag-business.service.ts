import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Location} from '../../model/location';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class PalletTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public GetSuggestedLocations(): Promise<Location[]> {
    var servObj = new ServiceObject("TagsLogic", "PalletTag", "GetSuggestedLocations");
    return this.apiGatewayService.PostActionSuccess(servObj);
  }

  public GetLocations(filters:any): Promise<Location[]> {
    var servObj = new ServiceObject("TagsLogic", "PalletTag", "GetLocations");
    servObj.Data = {filters:filters};
    return this.apiGatewayService.PostActionSuccess(servObj);
  }
  SaveTags(externalTagsId:number[], location:Location, rePrint: boolean) : Promise<boolean>
  {
    if (externalTagsId.length == 0) 
      return Promise.reject(new Error("Debe ingresar etiquetas externas."));
    if(!location)
      return Promise.reject(new Error("Debe seleccionar una ubicación."));
    let serviceObj = new ServiceObject("TagsLogic", 'PalletTag', 'SaveTags');
    serviceObj.Data = { externalTagsId:externalTagsId, locationId:location.LocationId, rePrint:rePrint };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        let result =  serviceObj.Data as boolean;
        if(!result)
          throw new Error("No fue posible crear la etiqueta. " + serviceObj.Message);
        return result;
      })
      .catch(x => {
        throw x;
      });
  }
  
}
