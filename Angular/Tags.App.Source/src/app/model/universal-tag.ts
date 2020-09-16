import { UniversalTagTypes } from './universal-tag-types.enum';

export class UniversalTag {

    UniversalTagId: number;
    TagTypeId: UniversalTagTypes;
    PurchaseOrderNumber: string;
    ProductionMasterId: number;
    WorkshiftId: number;
    WorkshiftName: string;
    ProductCode: string;
    ProductName: string;
    UnitMeasure: string;
    Quantity: number;
    QuantityToPrint: number;
    WarehouseCode: string;
    WarehouseName: string;
    LocationId: number;
    SupplierBatch: string;
    UseBefore: string;
    ConsecutiveQuality: string;
    ProductionLineId: number;
    ProductionLineName: string;
    ProductBatch: string;
    InternalBatchC: string;
    InternalBatchP: string;
    TotalWeight: number;
    NetWeight: number;
    PackageNumber: number;
    SectionId: number;
    SectionName: string;
    TemplateTypeId: number;
    Observations: string;
    CreationDate: Date;
    CreationUserDocument: string;
    CreationUserName: string;
    RePrint: boolean = false;
    Verified: boolean = false;
    Edition: string;
    PatternTagId: number;
    ExternalTagId: number;

}
