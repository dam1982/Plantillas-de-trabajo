import { InternalTag } from './internal-tag';

export class ExternalTag {
    ExternalTagId: number;
    OrderLineId: number;
    BoxNumber: number;
    Quantity: number;
    Batch: string;
    ProductionLineId: number;
    ProductionLineName: string;
    CreationUserDocument: string;
    CreationUserName: string;
    CreationDate: Date;
    ExpirationDate: Date;
    RePrint: boolean;
    Edition: string;
    LocationId: number;
    LocationName: string;
    Confirmed: boolean;
    Packages: InternalTag[];


    ValidationBoxesNumber(boxes: string) {
        const solo = boxes.match(/^\d+$/); //Numero solo
        const rango = boxes.match(/^\d+([-]\d+)([,]\d+)*$/); // Rango obligatorio 
        const items = boxes.match(/^\d+([,]\d+)+$/);   // Items obligatorioconst items = packages// Items obligatorio
        if (solo === null && rango === null && items === null) {
            return false;
        } else {
            return true;
        }
    }

}
