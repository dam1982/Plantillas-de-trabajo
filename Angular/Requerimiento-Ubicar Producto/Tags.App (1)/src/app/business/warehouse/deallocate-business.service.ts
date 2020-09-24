import { Injectable } from '@angular/core';
import { Deallocation } from 'src/app/model/deallocation';
import { ApiGatewayService } from '../services/api-gateway.service';
import { DeallocationDetail } from 'src/app/model/deallocation-detail';
import { ServiceObject } from 'src/app/model/service-object';

@Injectable({
  providedIn: 'root'
})
export class DeallocateBusinessService {

  CurrentDeallocation: Deallocation;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentDeallocation = new Deallocation();
  }

  public GetDeallocation(deallocationNumber: number): Promise<Deallocation> {
    var servObj = new ServiceObject("TagsLogic", "Deallocate", "GetDeallocation");
    servObj.Data = { deallocationNumber: deallocationNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentDeallocation, x.Data);
        return Promise.resolve(this.CurrentDeallocation);
      }).catch(x => {
        throw x;
      });
  }

  public SaveDeallocation(deallocationNumber: number, tag: string): Promise<DeallocationDetail[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Deallocate', 'SaveDeallocation');
    serviceObject.Data = { deallocationNumber: deallocationNumber, tag: tag };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          this.CurrentDeallocation.Details = serviceObject.Data as DeallocationDetail[];
          return this.CurrentDeallocation.Details;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public FinishDeallocation(deallocationNumber: number, observations: string): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'Deallocate', 'FinishDeallocation');
    serviceObject.Data = { deallocationNumber: deallocationNumber, observations: observations };

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
