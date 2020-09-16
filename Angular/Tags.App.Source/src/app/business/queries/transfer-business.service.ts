import { Injectable } from '@angular/core';
import { State } from 'src/app/model/state';
import { TransferPT } from 'src/app/model/transfer-pt';
import { QueryTransferPT, QueryTransferPTQuery } from 'src/app/model/query-transfer-pt';
import { InternalTag } from 'src/app/model/internal-tag';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { ProductFilter } from 'src/app/model/product-filter';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { User } from 'src/app/model/user';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { TransferPTDetails } from 'src/app/model/transfer-pt-details';



@Injectable({
  providedIn: "root"
})
export class TransferBusinessService {


  CurrentTransfer: QueryTransferPT;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentTransfer = new QueryTransferPT();
  }





  public async GetCustomers(filters: any): Promise<CustomerFilter[]> {
    let serviceObj = new ServiceObject("TagsLogic", 'Transfer', 'GetCustomers');
    serviceObj.Data = { filters: { Name: filters, Code: filters } };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const customers = serviceObj.Data as CustomerFilter[];
        return customers;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetProducts(filters: any): Promise<ProductFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'Transfer', 'GetProducts');
    serviceObj.Data = { filters: { Name: filters, Code: filters } };
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

  public async GetUsers(filters: any): Promise<User[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Transfer', 'GetUsers');
    serviceObject.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const transferPT = serviceObject.Data as User[];
        return transferPT;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetStates(filters: any): Promise<State[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'Transfer', 'GetStates');
    serviceObj.Data = { filters: filters };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;

        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const states = serviceObj.Data as State[];
        return states;
      }).catch(x => {

        throw x.message;
      });
  }


  public async GetSourceWarehouses(filters: any): Promise<WarehouseFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'Transfer', 'GetSourceWarehouses');
    serviceObj.Data = { filters: filters };
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


  public async GetDestinationWarehouses(filters: any): Promise<WarehouseFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'Transfer', 'GetDestinationWarehouses');
    serviceObj.Data = { filters: filters };
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

  public async GetOrders(filters: any): Promise<WarehouseFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'Transfer', 'GetOrders');

    serviceObj.Data = { filters: { OrderNumber: filters } };
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const orders = serviceObj.Data as WarehouseFilter[];
        return orders;
      })
      .catch(x => {
        throw x.message;
      });
  }




  public async SaveTransfer(transfer: TransferPT) {
    let serviceObject = new ServiceObject('TagsLogic', 'Transfer', 'SaveTransfer');
    serviceObject.Data = { transfer: transfer };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return true;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }


  public async GetTransfers(filters: QueryTransferPT): Promise<QueryTransferPT[]> {
    let serviceObject = new ServiceObject('TagsLogic', 'Transfer', 'GetTransfers');
    serviceObject.Data = { filters: filters };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const transferPT = serviceObject.Data as QueryTransferPT[];
        return transferPT;
      })
      .catch(x => {
        throw x;
      });
  }


  public async QueryTransfers(filters: QueryTransferPT): Promise<QueryTransferPTQuery> {
    let serviceObject = new ServiceObject('TagsLogic', 'QueryTransfers', 'GetTransfers');
    serviceObject.Data = { filters: filters };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        }
        const transferPT = serviceObject.Data as QueryTransferPTQuery;
        return transferPT;
      })
      .catch(x => {
        throw x;
      });
  }

  public GetTransfer(id: number): Promise<TransferPT> {
    var servObj = new ServiceObject("TagsLogic", "Transfer", "GetTransfer");
    servObj.Data = { transferId: id };
    return this.apiGatewayService.PostAction(servObj)
      .then(x => {
        if (!x.Success)
          throw new Error(x.Message);
        this.CurrentTransfer = x.Data;
        return Promise.resolve(x.Data);
      }).catch(x => {
        throw x
      }
      );
  }

  public async GetDetail(filters: any): Promise<TransferPTDetails> {
    let serviceObj = new ServiceObject("TagsLogic", 'Transfer', 'GetDetail');

    serviceObj.Data = filters;

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = <ServiceObject>x;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const detail = serviceObj.Data as TransferPTDetails;
        return detail;
      })
      .catch(x => {
        throw x.message;
      });
  } 

  public async GetInternalTag(filters: any): Promise<InternalTag> {
    let serviceObj = new ServiceObject("TagsLogic", 'Transfer', 'GetInternalTag');

    serviceObj.Data = { filters: filters };

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = <ServiceObject>x;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const InternalTag = serviceObj.Data as InternalTag;
        return InternalTag;
      })
      .catch(x => {
        throw x.message;
      });
  }
}
