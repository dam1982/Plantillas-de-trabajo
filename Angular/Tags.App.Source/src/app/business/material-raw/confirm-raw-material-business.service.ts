import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { TransferRawMaterial } from 'src/app/model/transfer-raw-material';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRawMaterialBusinessService {

  public CurrentTransfer: TransferRawMaterial;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.ResetCurrentTransfer();
  }

  ResetCurrentTransfer() {
    this.CurrentTransfer = new TransferRawMaterial();
  }

  public GetTransfer(transferNumber: number): Promise<TransferRawMaterial> {
    var servObj = new ServiceObject("TagsLogic", "ConfirmRawMaterial", "GetTransfer");
    servObj.Data = { transferNumber: transferNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        Object.assign(this.CurrentTransfer, x.Data);
        return Promise.resolve(this.CurrentTransfer);
      }).catch(x => {
        throw x;
      });
  }

  public GetFlatFile(transferNumber: number): Promise<Binary[]> {
    var servObj = new ServiceObject("TagsLogic", "ConfirmRawMaterial", "GetFlatFile");
    servObj.Data = { transferNumber: transferNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);

        return Promise.resolve(x.Data as Binary[]);
      }).catch(x => {
        throw x;
      });
  }

  public async ConfirmTransfer(transferNumber: number, tag: string): Promise<TransferRawMaterial> {
    let serviceObject = new ServiceObject('TagsLogic', 'ConfirmRawMaterial', 'ConfirmTransfer');
    serviceObject.Data = { transferNumber, tag };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success || !serviceObject.Data)
          throw new Error(serviceObject.Message);

        return Promise.resolve(x.Data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async FinishConfirm(transferNumber: number, observations: string): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'ConfirmRawMaterial', 'FinishConfirm');
    serviceObject.Data = { transferNumber, observations };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success || !serviceObject.Data)
          throw new Error(serviceObject.Message);

        return Promise.resolve(true);
      })
      .catch(x => {
        throw x.message;
      });
  }

}
