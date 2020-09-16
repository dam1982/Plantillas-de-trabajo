import { MaterialsInputDetails } from './materials-input-details';

export class MaterialsInput {

  Id:number;
  BarCodeMaster: string;
  WorkshiftId:number;
  TechnicalSheet:string;
  ArtCode: string;
  Observartions:string;
  Details: MaterialsInputDetails[];
}
