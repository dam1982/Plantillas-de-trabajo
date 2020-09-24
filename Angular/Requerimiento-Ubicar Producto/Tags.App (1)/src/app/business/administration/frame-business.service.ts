import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import {Frame} from '../../model/frame'
import {KeyValuePair} from '../../model/key-value-pair'

@Injectable({
  providedIn: 'root'
})
export class FrameBusinessService {
  constructor(private apiGatewayService: ApiGatewayService) { }


  public async GetFrames(filters: any): Promise<Frame[]> {
    let serviceObj = new ServiceObject("FrameService", 'AdminFrame', 'GetFrames');
    serviceObj.Data = { filters: filters};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const Locations = serviceObj.Data as Frame[];
        return Locations;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public SaveFrame(frame : Frame): Promise<boolean> {
    let serviceObject = new ServiceObject("FrameService" , "AdminFrame", "SaveFrame");
    serviceObject.Data = { frame };
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



  

  public async GetDimensions(): Promise<KeyValuePair[]> {
    let serviceObj = new ServiceObject("FrameService" , "AdminFrame", "GetDimensions");
    serviceObj.Data = {};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const Locations = serviceObj.Data as KeyValuePair[];
        return Locations;
      })
      .catch(x => {
        throw x.message;
      });
  }

}
