import { FieldTypes } from './field-types';
import { ServiceObject } from '../service-object';

export class Field {
    FieldName: string;
    Title: string;
    FieldType: FieldTypes;
    CustomType: string;
    Required: boolean;
    MinValue: any;
    MaxValue: any;
    DefaultValue: any;
    Width: number;
    Format: string;
    IdField: string;
    DisplayField: string;
    DataService: ServiceObject;

    constructor(FieldName?: string, FieldType?: FieldTypes, IdField?: string, value?: any) {
        this.FieldName = FieldName;
        this.FieldType = FieldType;
        this.IdField = IdField;
        this.DefaultValue = value;
    }

}
