import { TagType } from './tag-type';
import { Template } from './template';
import { Printer } from './printer';
import { PrinterPointUsers } from './printer-point-users';

export class PrinterPoint {

    Id: number;
    Code: string;
    Name: string;
    TagType: TagType;
    Template: Template;
    Printer: Printer;
    Users: PrinterPointUsers[];
}
