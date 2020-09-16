import { Injectable } from '@angular/core';
import { ProductFilter } from 'src/app/model/product-filter';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { User } from 'src/app/model/user';
import { QueryExternalTag } from 'src/app/model/query-external-tag';
import { Location } from 'src/app/model/location';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { QueryExternalTagData } from 'src/app/model/query-external-tag-data';


@Injectable({
  providedIn: 'root'
})
export class QueryExternalTagBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }

  public GetCostumers(filters: any): Promise<CustomerFilter[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryExternalTag', 'GetCustomers');
    serviceObj.Data = { filters:{  Name:filters, Code:filters} };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const costumers = serviceObj.Data as CustomerFilter[];
        return costumers;
      })
      .catch(x => {
        throw x;
      });
  }

  public GetProducts(filters: any): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'QueryExternalTag', 'GetProducts');
    serviceObj.Data = { filters:{  Name:filters, Code:filters} };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const products = serviceObj.Data as ProductFilter[];
        return products;
      })
      .catch(x => {
        throw x;
      });
  }

  public GetLocations(): Promise<Location[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryExternalTag', 'GetLocations');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const locations = serviceObj.Data as Location[];
        return locations;
      })
      .catch(x => {
        throw x;
      });
  }


  public GetUsers(): Promise<User[]> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryExternalTag', 'GetUsers');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const users = serviceObj.Data as User[];
        return users;
      })
      .catch(x => {
        throw x;
      });
  }

  public GetTags(filters: any): Promise<QueryExternalTag> {

    let serviceObj = new ServiceObject("TagsLogic", 'QueryExternalTag', 'GetTags');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        var query = <QueryExternalTag> serviceObj.Data ;       
        query.Tags =  query.Tags.map(item  => {
           item = Object.assign(new QueryExternalTagData,item) ;
           item.BarCode = item.GetBarCode();                      
           return item           
        });

        return query;
      })
      .catch(x => {
        throw x;
      });
  }





}
