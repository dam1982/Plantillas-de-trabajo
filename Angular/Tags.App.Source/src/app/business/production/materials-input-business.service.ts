import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductionMasterMaterial } from 'src/app/model/production-master-material';
import { MaterialDetail } from 'src/app/model/material-detail';
import { MaterialsInput } from 'src/app/model/materials-input';

@Injectable({
  providedIn: 'root'
})
export class MaterialsInputBusinessService {



  constructor(private apiGatewayService: ApiGatewayService) {

  }


  public IsArtRequired(barCodeMaster: string): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "IsArtRequired");
    servObj.Data = { barCodeMaster };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetWorkshifts(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "GetWorkshifts");
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetMaterials(barCodeMaster:string,technicalSheet:string,artCode:string): Promise<ProductionMasterMaterial[]> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "GetMaterials");
    servObj.Data = { barCodeMaster, technicalSheet, artCode };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public ValidateMaterial(barCodeMaster: string,barCodeTag:string): Promise<number> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "ValidateMaterial");
    servObj.Data = { barCodeMaster, barCodeTag };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetDetail(barCodeMaster: string): Promise<MaterialDetail[]> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "GetDetail");
    servObj.Data = { barCodeMaster };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public SaveProductionMaster(materialsInput: MaterialsInput): Promise<number> {
    let serviceObject = new ServiceObject('TagsLogic', 'MaterialsInput', 'SaveProductionMaster');
    serviceObject.Data = { materialsInput };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as number;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public ChangeArtCode(barCodeMaster: string,artCode:string): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsInput", "ChangeArtCode");
    servObj.Data = { barCodeMaster, artCode };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
}
