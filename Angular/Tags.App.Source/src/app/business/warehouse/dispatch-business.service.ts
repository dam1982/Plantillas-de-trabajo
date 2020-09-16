import { Injectable } from '@angular/core';
import { Enlistment } from 'src/app/model/enlistment';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { User } from 'src/app/model/user';
import { EnlistmentBoxes } from 'src/app/model/enlistment-boxes';
import { ManualDispatch } from 'src/app/model/manual-dispatch';

@Injectable({
  providedIn: 'root'
})
export class DispatchBusinessService {

  CurrentEnlistment: Enlistment;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentEnlistment = new Enlistment();
  }

  public GetEnlistment(enlistmentNumber: number): Promise<Enlistment> {
    var servObj = new ServiceObject("TagsLogic", "Dispatch", "GetEnlistment");
    servObj.Data = { enlistmentNumber: enlistmentNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentEnlistment, x.Data);
        return Promise.resolve(this.CurrentEnlistment);
      }).catch(x => {
        throw x
      });
  }

  public async GetUsers(): Promise<User[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Dispatch', 'GetUsers');
    serviceObject.Data = {};

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const user = serviceObject.Data as User[];
        return user;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public SaveDispatch(enlistmentNumber: number, tag: string, isDispatch: boolean): Promise<EnlistmentBoxes[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Dispatch', 'SaveDispatch');
    serviceObject.Data = { enlistmentNumber, tag, isDispatch };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          const boxes = serviceObject.Data as EnlistmentBoxes[];
          this.CurrentEnlistment.Boxes = boxes;
          return boxes;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public FinishDispatch(enlistmentNumber: number, observations: string, isDispatch: boolean): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'Dispatch', 'FinishDispatch');
    serviceObject.Data = { enlistmentNumber, observations, isDispatch };
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

  public ManualDispatch(manualDispatch: ManualDispatch): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'Dispatch', 'ManualDispatch');
    serviceObject.Data = { manualDispatch };
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
