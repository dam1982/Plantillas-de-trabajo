import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { ProductFilter } from 'src/app/model/product-filter';
import { MaterialsRequest } from 'src/app/model/materials-request';

@Injectable({
  providedIn: 'root'
})
export class MaterialRequestBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  CurrentMaterialRequest : MaterialsRequest = new MaterialsRequest();


  public async GetMaterialWarehouses(): Promise<WarehouseFilter[]> {
    // let serviceObj = new ServiceObject('TagsLogic', 'MaterialsRequest', 'GetMaterialWarehouses');
    let serviceObj = new ServiceObject('TagsLogic', 'RequestManagement', 'GetWarehouses');
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const warehouses = serviceObj.Data as WarehouseFilter[];
        return warehouses;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetDestinationWarehouses(): Promise<WarehouseFilter[]> {
   //let serviceObj = new ServiceObject('TagsLogic', 'MaterialsRequest', 'GetDestinationWarehouses');
    let serviceObj = new ServiceObject('TagsLogic', 'RequestManagement', 'GetWarehouses');
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const warehouses = serviceObj.Data as WarehouseFilter[];
        return warehouses;
      })
      .catch(x => {
        throw x.message;
      });
  }


  public async GetProducts(filters: any): Promise<ProductFilter[]> {
    //let serviceObj = new ServiceObject('TagsLogic', 'MaterialsRequest', 'GetProducts');
    let serviceObj = new ServiceObject('TagsLogic', 'RequestManagement', 'GetProducts');

    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const prods = serviceObj.Data as ProductFilter[];
        return prods;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public GetMaterialsRequest(requestNumber: number): Promise<MaterialsRequest> {
    if(requestNumber == 0)
    {
      this.CurrentMaterialRequest = new MaterialsRequest();
      return Promise.resolve(this.CurrentMaterialRequest);
    }
    
    var servObj = new ServiceObject("TagsLogic", "MaterialsRequest", "GetMaterialsRequest");
    servObj.Data = { requestNumber: requestNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        Object.assign(this.CurrentMaterialRequest,x.Data);
        return Promise.resolve(this.CurrentMaterialRequest);
      }).catch(x => {
        throw x;
      });
  }

  public SaveMaterialsRequest(): Promise<number> {

    if(this.CurrentMaterialRequest.Details.length == 0)
      return Promise.reject("Debe agregar productos a la requisición.");

    let serviceObject = new ServiceObject('TagsLogic', 'MaterialsRequest', 'SaveMaterialsRequest');
    serviceObject.Data = { materialsRequest : this.CurrentMaterialRequest };

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

  public CancelMaterialsRequest(requestNumber: number): Promise<boolean> {
    var servObj = new ServiceObject("TagsLogic", "MaterialsRequest", "CancelMaterialsRequest");
    servObj.Data = { requestNumber: requestNumber };
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
