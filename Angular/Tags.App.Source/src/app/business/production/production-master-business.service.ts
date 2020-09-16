import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Order } from 'src/app/model/order';
import { ServiceObject } from 'src/app/model/service-object';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { ProductFilter } from 'src/app/model/product-filter';
import { ProductionMaster } from 'src/app/model/production-master';
import { AppEnviroment } from 'src/app/model/app-enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductionMasterBusinessService {

  public CurrentProdMaster: ProductionMaster;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.ResetProdMaster();
   }

  ResetProdMaster(){
    this.CurrentProdMaster = new ProductionMaster();
  }

  GetOrderData(orderNumber: string): Promise<Order> {
    var servObj = new ServiceObject("TagsLogic", "ProductionMaster", "GetOrderData");
    servObj.Data = { orderNumber };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        let result: Order =  Object.assign(new Order(),servObj.Data );
        this.CurrentProdMaster.CustomerCode = result.Customer.Code;
        this.CurrentProdMaster.CustomerName = result.Customer.Name;
        //result.RefineOrderLines();
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }

  GetProductionLines(): Promise<KeyValuePair[]> {
    var servObj = new ServiceObject("TagsLogic", "ProductionMaster", "GetProductionLines");
    servObj.Data = {};
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        var result = servObj.Data as KeyValuePair[];
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }

  public GetProducts(filters: ProductFilter): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'ProductionMaster', 'GetProducts');

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

  public GetReportPreview(orderNumber: string, productCode:string, productionLineId: number): string {
    let serviceObj = new ServiceObject('TagsLogic', 'ProductionMaster', 'GetReportPreview');

    let filters = { orderNumber, productCode, productionLineId };

    var link = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=TagsLogic&Module=ProductionMaster&Action=GetReportPreview&Data=${JSON.stringify(filters)}&SessionToken=${AppEnviroment.User.SessionToken}`;

    return link;
  }



  SaveProductionMaster(orderNumber: string,productCode:string,productionLineId:number): Promise<number> {
    var servObj = new ServiceObject("TagsLogic", "ProductionMaster", "SaveProductionMaster");
    servObj.Data = { orderNumber,productCode, productionLineId };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        servObj = x as ServiceObject;
        if (!servObj.Success)
          throw new Error(servObj.Message);

        var result = servObj.Data as number;
        return Promise.resolve(result);
      })
      .catch(x => {
        throw x;
      });
  }

  public GetReport(productionMasterId: number): string {

    let filters = { productionMasterId };
    var link = `${AppEnviroment.ApiEndPoint}ServiceRouter/GetFileAction?Service=TagsLogic&Module=ProductionMaster&Action=GetReport&Data=${JSON.stringify(filters)}&SessionToken=${AppEnviroment.User.SessionToken}`;

    return link;
  }
}
