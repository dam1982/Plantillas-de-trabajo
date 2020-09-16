


export class InternalTag {

  InternalTagId: number;
  PackageNumber: number;
  Quantity: number;
  BatchDate: string;
  Batch: string;
  PackerCode: number;
  PackerName: string;
  CreationDate: string;
  ProductionLineId: number;
  ProductionLineName: string;
  WarehouseCode: string;
  WarehouseName: string;
  RePrint: boolean;
  Edition: string;
  Cycle: string;
  QuantityToPrint:number;

  
  GenerateBatch(ProductCode: string, date: string) {

    let codProd = ProductCode.slice(-5);
    codProd = codProd.charAt(0) === '0' ? codProd.slice(-4) : codProd;
    const fecha = date.split("-");
    const anio = parseInt(fecha[0]) - 1990;
    const mes = String.fromCharCode(64 + parseInt(fecha[1]));

    this.Batch = codProd + "-" + anio + mes + fecha[2];
    return this.Batch;
  }

}
