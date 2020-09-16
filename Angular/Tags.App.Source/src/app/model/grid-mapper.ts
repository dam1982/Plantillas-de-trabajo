import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';

export class GridMapper<T> {


  constructor() {
    this.Messages.emptyMessage = "No hay registros a mostrar.";
    this.Messages.totalMessage = "Total";
    this.Messages.selectedMessage = "Seleccionado";
  }
  _rows: T[];
  _originalRows: T[] = null;
  get DisplayRows(): T[] {
    return this._rows;
  }

  set DisplayRows(data: T[]) {
    this._rows = data; 
    this._originalRows=JSON.parse(JSON.stringify(data));
  }
  SelectedRows: T[] = [];
  Columns: any[];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  Messages: any = {};

  FilterRows(filter: string) {
    var cols = this.Columns;
    this._rows = this._originalRows.filter(function (d) {
      var match = false;
      cols.forEach(item => {
        if (d[item.prop] && d[item.prop].toString().toLowerCase().indexOf(filter) !== -1 || !filter)
          match = true;
      });
      return match;
    });
  }

  ExportExcelDisplayColumns(TitleExcel: string) {
    if (this.DisplayRows.length == 0) {
      throw "No existen registros para exportar.";
    }
    var headers: string[] = [];
    this.Columns.forEach(x => {
      headers.push(x.name);     
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([], { header: headers, skipHeader: false });
    XLSX.utils.sheet_add_json(ws, this.GetDisplayData(), { skipHeader: true, origin: "A2" });
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    return XLSX.writeFile(wb, TitleExcel + '.xlsx');
  }

  ExportExcelAllColums(TitleExcel: string) {
    if (this.DisplayRows.length == 0) {
      throw "No existen registros para exportar.";
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.DisplayRows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    return XLSX.writeFile(wb, TitleExcel + '.xlsx');
  }

  GetDisplayData(): any[]
  {
    var recordset:any[]=[];
    this.DisplayRows.forEach(row => {
      var newObj : any={};
      this.Columns.forEach(col=>
        {
          newObj[col.prop] = row[col.prop];
        });
      recordset.push(newObj);
    });
    return recordset;
  }

}
