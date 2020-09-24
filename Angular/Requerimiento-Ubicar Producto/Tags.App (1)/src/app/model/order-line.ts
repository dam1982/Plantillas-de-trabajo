import { InternalTag } from './internal-tag';
import { TagsSummary } from './tags-summary';

export class OrderLine {

    OrderLineId: number;
    ProductCode: string;
    ProductName: string;
    AbbreviatedCode: string;
    Quantity: number;
    UnitMeasure: string;
    Group: string;
    QuantityUnitsByPackage: number;
    QuantityUnitsByBox: number;
    QuantityPackageByBox: number;
    QuantityPackageByOrder: number;
    QuantityBoxByOrder: number;
    OrderTolerance: number;
    PackageTolerance: number;
    OrderToleranceByBox: number;
    OrderToleranceByPackage: number;
    ToleranceByBox: number;
    ToleranceByPackage: number;
    NumberCopiesPrint: number;
    ExpirationYears: number;
    ColorTags: string;
    CodBarInt: string;
    CodBarExt: string;
    RsInvima: string;
    TitleExternalNP: string;
    TextExternalSterilized: string;
    Packages: InternalTag[];
    TagsSummary: TagsSummary;
}
