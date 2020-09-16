import { Injectable } from '@angular/core';
import { UniversalTag } from 'src/app/model/universal-tag';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { PurchaseOrder } from 'src/app/model/purchase-order';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { ProductFilter } from 'src/app/model/product-filter';
import { PurchaseOrderProduct } from 'src/app/model/purchase-order-product';


@Injectable({
  providedIn: 'root'
})
export class UniversalTagBusinessService {

  public CurrentUniversalTag: UniversalTag;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.resetTag();
    this.CurrentUniversalTag.TagTypeId = 0;
  }

  resetTag() {
    this.CurrentUniversalTag = new UniversalTag();
    this.CurrentUniversalTag.UniversalTagId = 0;
  }



  public GetOrderData(purchaseOrder: string): Promise<PurchaseOrder> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetOrderData");
    servObj.Data = { purchaseOrder };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }

  public GetSections(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetSections");

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
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetWorkshifts");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public GetWarehouses(): Promise<WarehouseFilter[]> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetWarehouses");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public GetLocations(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetLocations");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public GetTemplateType(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetTemplateType");

    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public GetProducts(filters: ProductFilter): Promise<PurchaseOrderProduct[]> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetProducts");
    servObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }
  public GetMasterProduct(masterCode: string): Promise<UniversalTag> {
    var servObj = new ServiceObject("TagsLogic", "UniversalTag", "GetMasterProduct");
    servObj.Data = { masterCode };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        Object.assign(this.CurrentUniversalTag, x.Data);
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x;
      });
  }


  public SaveTags(universalTag: UniversalTag): Promise<number[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'UniversalTag', 'SaveTags');
    serviceObject.Data = { universalTag };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as number[];
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

}
