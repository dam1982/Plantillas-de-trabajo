import { Injectable } from '@angular/core';
import { TransferRawMaterial } from 'src/app/model/transfer-raw-material';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { WarehouseFilter } from 'src/app/model/ware-house-filter';
import { ProductByBatches } from 'src/app/model/product-by-batches';
import { TransferTypes } from 'src/app/model/transfer-pt';
import { TransferRawMaterialDetail } from 'src/app/model/transfer-raw-material-detail';

@Injectable({
  providedIn: 'root'
})
export class TransferRawMaterialBusinessService {

  public CurrentTransfer: TransferRawMaterial;

  constructor(private apiGatewayService: ApiGatewayService) {
    this.CurrentTransfer = new TransferRawMaterial();
  }

  ResetCurrentTransfer() {
    this.CurrentTransfer = new TransferRawMaterial();
    this.CurrentTransfer.TransferNumber = 0;
    this.CurrentTransfer.TransferTypeId = TransferTypes.Transfer;
    let detail = new TransferRawMaterialDetail();
    detail.DetailId = 0;
    this.CurrentTransfer.Details = [];
    this.CurrentTransfer.Details.push(detail);
  }

  public GetTransfer(transferNumber: number): Promise<TransferRawMaterial> {
    var servObj = new ServiceObject("TagsLogic", "TransferRawMaterial", "GetTransfer");
    servObj.Data = { transferNumber: transferNumber };
    /* let dat = {

      "TransferNumber": 1,
      "SourceWarehouseCode": "3C0100811",
      "SourceWarehouseName": "Fedex",
      "DestinationWarehouseCode": "3C01008119",
      "DestinationWarehouseName": "DHL",
      "StateId": 0,
      "CreationDate": "14/05/2020",
      "Delivery": "Andres",
      "DeliveryObservations": null,
      "Receipt": "Julio",
      "ReceiptObservations": "",
      "TransferTypeId": TransferTypes.Transfer,
      "RequestNumber": 55,
      "RequestObservations": "",
      "Details": [
        {
          "DetailId": 5,
          "UniversalTagId": 25,
          "ProductCode": "AC22D",
          "ProductName": "Prod C",
          "RequestedQuantity": 100,
          "DeliveredQuantity": 50,
          "UnitMeasure": "KG",
          "SupplierBatch": "EE12-8",
          "ProductBatch": "77-88",
          "InternalBatchC": "R7",
          "InternalBatchP": "R2",
          "Received": true
        }
      ]
    };
    Object.assign(this.CurrentTransfer, dat);
    return Promise.resolve(this.CurrentTransfer); */
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

  public async GetSourceWarehouses(): Promise<WarehouseFilter[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'GetSourceWarehouses');
    /* let warehouses = [
      { "Code": "3C0100811", "Name": "Bodega Farma" },
      { "Code": "3C0100812", "Name": "Bod 2" },
      { "Code": "3C01008119", "Name": "Bod 3" },
      { "Code": "3C0100814", "Name": "Bod 4" },
      { "Code": "3C0100815", "Name": "Bod 5" }
    ];
    return Promise.resolve(warehouses); */
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
    let serviceObj = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'GetDestinationWarehouses');
    /* let warehouses = [
      { "Code": "3C0100811", "Name": "Bodega Farma" },
      { "Code": "3C0100812", "Name": "Bod 2" },
      { "Code": "3C01008119", "Name": "Bod 3" },
      { "Code": "3C0100814", "Name": "Bod 4" },
      { "Code": "3C0100815", "Name": "Bod 5" }
    ];
    return Promise.resolve(warehouses); */
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


  public SaveTransfer(transfer: TransferRawMaterial): Promise<TransferRawMaterial> {
    let serviceObject = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'SaveTransfer');
    serviceObject.Data = { transfer };

    /* let dat = {

      "TransferNumber": 1,
      "SourceWarehouseCode": "PF",
      "SourceWarehouseName": "PROCESO FARMACEUTICO",
      "DestinationWarehouseCode": "CI",
      "DestinationWarehouseName": "CUARENTENA PROD INSUMOS",
      "StateId": 0,
      "CreationDate": "14/05/2020",
      "Delivery": "Andres",
      "DeliveryObservations": null,
      "Receipt": "Julio",
      "ReceiptObservations": "",
      "TransferTypeId": TransferTypes.Request,
      "RequestNumber": 55,
      "RequestObservations": "Obs de request",
      "Details": [
        {
          "DetailId": 5,
          "UniversalTagId": 25,
          "ProductCode": "AC22D",
          "ProductName": "Prod C",
          "RequestedQuantity": 100,
          "DeliveredQuantity": 50,
          "UnitMeasure": "KG",
          "SupplierBatch": "EE12-8",
          "ProductBatch": "77-88",
          "InternalBatchC": "R7",
          "InternalBatchP": "R2",
          "Received": true
        }
      ]
    };
    Object.assign(this.CurrentTransfer, dat); 
    return Promise.resolve(this.CurrentTransfer);*/
    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          Object.assign(this.CurrentTransfer, serviceObject.Data);
          return this.CurrentTransfer;
        }
      })
      .catch(x => {
        throw x.message;
      });
  }

  public RemoveTransferDetail(detailId: number): Promise<TransferRawMaterial> {
    var servObj = new ServiceObject("TagsLogic", "TransferRawMaterial", "RemoveTransferDetail");
    servObj.Data = { detailId: detailId };
    /* let dat = {

      "TransferNumber": 1,
      "SourceWarehouseCode": "A1",
      "SourceWarehouseName": "Fedex",
      "DestinationWarehouseCode": "B2",
      "DestinationWarehouseName": "DHL",
      "StateId": 0,
      "CreationDate": "14/05/2020",
      "Delivery": "Andres",
      "DeliveryObservations": null,
      "Receipt": "Julio",
      "ReceiptObservations": "",
      "TransferTypeId": TransferTypes.Transfer,
      "RequestNumber": 55,
      "RequestObservations": "",
      "Details": [
        {
          "DetailId": 5,
          "UniversalTagId": 25,
          "ProductCode": "AC22D",
          "ProductName": "Prod C",
          "RequestedQuantity": 100,
          "DeliveredQuantity": 50,
          "UnitMeasure": "KG",
          "SupplierBatch": "EE12-8",
          "ProductBatch": "77-88",
          "InternalBatchC": "R7",
          "InternalBatchP": "R2",
          "Received": true
        }
      ]
    };
    Object.assign(this.CurrentTransfer, dat);
    return Promise.resolve(this.CurrentTransfer); */
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


  public FinishTransfer(transferNumber: number, observations: string): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'FinishTransfer');
    serviceObject.Data = { transferNumber, observations };
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

  public CancelTransfer(transferNumber: number): Promise<boolean> {
    let serviceObject = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'CancelTransfer');
    serviceObject.Data = { transferNumber };
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

  public async GetRequestNumbers(): Promise<number[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'GetRequestNumbers');
    serviceObj.Data = {};
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const reqNums = serviceObj.Data as number[];
        return reqNums;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetMaterialsRequest(requestNumber: number): Promise<TransferRawMaterial> {
    let serviceObj = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'GetMaterialsRequest');
    serviceObj.Data = { requestNumber };
    /* let dat = {

      "TransferNumber": 1,
      "SourceWarehouseCode": "A1",
      "SourceWarehouseName": "Fedex",
      "DestinationWarehouseCode": "B2",
      "DestinationWarehouseName": "DHL",
      "StateId": 0,
      "CreationDate": "14/05/2020",
      "Delivery": "Andres",
      "DeliveryObservations": null,
      "Receipt": "Julio",
      "ReceiptObservations": "",
      "TransferTypeId": TransferTypes.Transfer,
      "RequestNumber": 55,
      "RequestObservations": "",
      "Details": [
        {
          "DetailId": 5,
          "UniversalTagId": 25,
          "ProductCode": "AC22D",
          "ProductName": "Prod C",
          "RequestedQuantity": 100,
          "DeliveredQuantity": 50,
          "UnitMeasure": "KG",
          "SupplierBatch": "EE12-8",
          "ProductBatch": "77-88",
          "InternalBatchC": "R7",
          "InternalBatchP": "R2",
          "Received": true
        }
      ]
    };
    Object.assign(this.CurrentTransfer, dat);
    return Promise.resolve(this.CurrentTransfer); */

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        Object.assign(this.CurrentTransfer, serviceObj.Data);
        return this.CurrentTransfer;
      })
      .catch(x => {
        throw x.message;
      });
  }

  public async GetProductByBatch(productCode: string, sourceWarehouseCode: string): Promise<ProductByBatches[]> {
    let serviceObj = new ServiceObject('TagsLogic', 'TransferRawMaterial', 'GetProductByBatch');
    serviceObj.Data = { productCode, sourceWarehouseCode };
    /* let dat = [
      {
        "UniversalTagId": 55,
        "PackageNumber": 36,
        "InternalBatchC": "AB95",
        "InternalBatchP": "V95",
        "SupplierBatch": "C95",
        "ProductBatch": "AC95",
        "LocationId": 12,
        "LocationName": "Bogota",
        "Quantity": 20
      }
    ];

    return Promise.resolve(dat); */
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const prod = serviceObj.Data as ProductByBatches[];
        return prod;
      })
      .catch(x => {
        throw x.message;
      });
  }


}
