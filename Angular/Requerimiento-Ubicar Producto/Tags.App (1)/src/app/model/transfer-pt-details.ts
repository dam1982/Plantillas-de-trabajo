import { InternalTag } from './internal-tag';
import { PackagesInfo } from './packages-info';


export class TransferPTDetails {

  DetailId: number;
  InternalTagId:number;
  Quantity: number;
  Confirmed: boolean;
  ReasonId: number;
  ReasonName: string;
  Observations: string;
  PackagesInfo: PackagesInfo;  
}
