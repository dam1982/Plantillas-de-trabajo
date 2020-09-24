import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { Location } from 'src/app/model/location';

@Injectable({
  providedIn: 'root'
})
export class TransferPalletBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) {

   }

   public GetSuggestedLocations(): Promise<Location[]> {
    var servObj = new ServiceObject("TagsLogic", "TransferPallet", "GetSuggestedLocations");
    return this.apiGatewayService.PostActionSuccess(servObj);
  }
  
  public GetLocations(filters:any): Promise<Location[]> {
    var servObj = new ServiceObject("TagsLogic", "TransferPallet", "GetLocations");
    servObj.Data = {filters:filters};
    return this.apiGatewayService.PostActionSuccess(servObj);
  }
  UpdateLocation(palletTagId:number, location:Location) : Promise<boolean>
  {
    if (!palletTagId) 
      return Promise.reject(new Error("Debe ingresar etiqueta de estiba."));
    if(!location)
      return Promise.reject(new Error("Debe seleccionar una ubicación."));
    let serviceObj = new ServiceObject("TagsLogic", 'TransferPallet', 'UpdateLocation');
    serviceObj.Data = { palletTagId:palletTagId, locationId:location.LocationId };
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
