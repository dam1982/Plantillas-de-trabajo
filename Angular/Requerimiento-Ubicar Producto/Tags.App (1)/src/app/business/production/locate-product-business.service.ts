import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { Location } from 'src/app/model/location';
@Injectable({
  providedIn: 'root'
})
export class LocateProductBusinessService {
  constructor(private apiGatewayService: ApiGatewayService) {
  }
  public async GetLocations(filters: any): Promise<Location[]> {
  let serviceObj = new ServiceObject("ProductService", 'LocateProduct', 'GetLocations');
  serviceObj.Data = { filters: filters};
  return this.apiGatewayService.PostAction(serviceObj)
    .then(x => {
      serviceObj = x as ServiceObject;
      if (!serviceObj.Success) {
        throw new Error(serviceObj.Message);
      }
      const Locations = serviceObj.Data as Location[];
      return Locations;
    })
    .catch(x => {
      throw x.message;
    });
}
UpdateLocation(palletTagId:string, location:Location) : Promise<boolean>{
  let serviceObject = new ServiceObject("ProductService", 'LocateProduct', 'UpdateLocation');
  serviceObject.Data = { barCodeTag:palletTagId, locationId:location.LocationId };
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




