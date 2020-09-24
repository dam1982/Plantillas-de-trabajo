import { Injectable } from '@angular/core';
import {ServiceObject} from '../../model/service-object';
import {ApiGatewayService } from '../../business/services/api-gateway.service';
import {Profile} from '../../model/profile'
import {Permission} from '../../model/permission'

@Injectable({
  providedIn: 'root'
})
export class AdminProfileBusiness {

  constructor(private ApiGatewayService : ApiGatewayService) { }

  GetProfiles(filters: any): Promise<Profile[]> {
    var servObj = new ServiceObject("Profile","AdminProfile","GetProfiles");
      servObj.Data = { filters: filters };
      return this.ApiGatewayService.PostAction(servObj)
          .then(x => {
              servObj = <ServiceObject>x;
              if (!servObj.Success)
                  throw new Error(servObj.Message);

                  return Promise.resolve(<Profile[]>servObj.Data);
          })
          .catch(x => {
              throw x;
          });
 }



 GetProfile(profileId: string): Promise<Profile> {
  var servObj = new ServiceObject("Profile","AdminProfile","GetProfile");
    servObj.Data = { profileId: profileId };
    return this.ApiGatewayService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            if (!servObj.Success)
                throw new Error(servObj.Message);

                return Promise.resolve(<Profile>servObj.Data);
        })
        .catch(x => {
            throw x;
        });
}


SaveProfile(Profile: Profile): Promise<boolean> {
  var servObj = new ServiceObject("Profile","AdminProfile","SaveProfile");
    servObj.Data = { Profile: Profile };
    return this.ApiGatewayService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            if (!servObj.Success)
                throw new Error(servObj.Message);

                return Promise.resolve(<boolean>servObj.Data);
        })
        .catch(x => {
            throw x;
        });
}


GetPermisions(): Promise<Permission[]> {
  var servObj = new ServiceObject("Profile","AdminProfile","GetPermissions");
    servObj.Data = { };
    return this.ApiGatewayService.PostAction(servObj)
        .then(x => {
            servObj = <ServiceObject>x;
            if (!servObj.Success)
                throw new Error(servObj.Message);

                return Promise.resolve(<Permission[]>servObj.Data);
        })
        .catch(x => {
            throw x;
        });
}

}
