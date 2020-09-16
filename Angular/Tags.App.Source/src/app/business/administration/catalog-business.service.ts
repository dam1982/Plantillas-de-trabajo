import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import {CatalogValue} from '../../model/catalog-value'
import {KeyValuePair} from '../../model/key-value-pair'

@Injectable({
  providedIn: 'root'
})
export class CatalogBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }


  public async GetCatalogs(): Promise<CatalogValue[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'AdminCatalog', 'GetCatalogs');
    serviceObj.Data = { filters: {}};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const Locations = serviceObj.Data as CatalogValue[];
        return Locations;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public SaveCatalog(catalogValue: CatalogValue): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'AdminCatalog', 'SaveCatalog');
    serviceObject.Data = { catalogValue };
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




  public async GetCatalogList(): Promise<KeyValuePair[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'AdminCatalog', 'GetCatalogList');
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


