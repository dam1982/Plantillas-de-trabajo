import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import {Location} from '../../model/location'
@Injectable({
  providedIn: 'root'
})
export class LocationBusinessService {
  constructor(private apiGatewayService: ApiGatewayService) { }
  public async GetLocations(locationName: string): Promise<Location[]> {
    let serviceObj = new ServiceObject("LocationService", 'AdminLocation', 'GetLocations');
    serviceObj.Data = { locationName: locationName};
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
  public SaveLocation(Location: Location): Promise<boolean> {
    let serviceObject = new ServiceObject('LocationService', 'AdminLocation', 'SaveLocation');
    serviceObject.Data = { Location };
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



