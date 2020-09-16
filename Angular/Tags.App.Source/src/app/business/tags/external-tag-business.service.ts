import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { ConfirmValidation } from 'src/app/model/confirm-validation';

@Injectable({
  providedIn: 'root'
})
export class ExternalTagBusinessService {

  ExternalTagCode:string = null;
  constructor(private apiGatewayService: ApiGatewayService) { }

  ValidateQuantityPackageByBox(orderLineId:number, packagesNumber:number[]) : Promise<boolean>
  {
    if (packagesNumber.length == 0) 
      return Promise.reject(new Error("Debe ingresar etiquetas internas."));

    let serviceObj = new ServiceObject("TagsLogic", 'ExternalTag', 'ValidateQuantityPackageByBox');
    serviceObj.Data = { orderLineId:orderLineId, packageNumber:packagesNumber };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const response = serviceObj.Data as boolean;
        return response;
      })
      .catch(x => {
        throw x;
      });
  }

  SaveTags(orderLineId:number, packageNumber:number[], rePrint: boolean, authorizationUserId:number ) : Promise<string>
  {
    if (packageNumber.length == 0) 
      return Promise.reject(new Error("Debe ingresar etiquetas internas."));

    let serviceObj = new ServiceObject("TagsLogic", 'ExternalTag', 'SaveTags');
    serviceObj.Data = { orderLineId:orderLineId, packageNumber:packageNumber, rePrint:rePrint, authorizationUserId:authorizationUserId };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        this.ExternalTagCode = serviceObj.Data as string;
        return this.ExternalTagCode;
      })
      .catch(x => {
        throw x;
      });
  }

  ConfirmExternalTag(tag:string) : Promise<boolean>
  {
    if(tag != this.ExternalTagCode)
      return Promise.reject(new Error("El código de etiqueta ingresado no coincide con el código impreso. Por favor verifique."));
      

    let serviceObj = new ServiceObject("TagsLogic", 'ExternalTag', 'ConfirmExternalTag');
    serviceObj.Data = { tag:tag};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success ) 
          throw new Error(serviceObj.Message);
        
        const response = serviceObj.Data as boolean;
        if (!response) 
          throw new Error(serviceObj.Message);
        
        this.ExternalTagCode = null;
        return response;
      })
      .catch(x => {
        throw x;
      });
  }

  ValidateConfirmation() : Promise<ConfirmValidation>
  {
    let serviceObj = new ServiceObject("TagsLogic", 'ExternalTag', 'ValidateConfirmation');
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success ) 
          throw new Error(serviceObj.Message);
        
        const response = serviceObj.Data as ConfirmValidation;
        return response;
      })
      .catch(x => {
        throw x;
      });
  }



}
