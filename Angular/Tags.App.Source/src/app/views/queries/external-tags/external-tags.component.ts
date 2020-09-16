import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QueryExternalTagData } from 'src/app/model/query-external-tag-data';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { NgSelectConfig } from '@ng-select/ng-select';
import * as XLSX from 'xlsx';
import { QueryExternalTagBusinessService } from 'src/app/business/queries/query-external-tag-business.service';
import { QueryExternalTagTotals } from 'src/app/model/query-external-tag-totals';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-external-tags',
  templateUrl: './external-tags.component.html',
  styleUrls: ['./external-tags.component.scss']
})
export class ExternalTagsComponent implements OnInit {

  formSearchExternalTag: FormGroup;
  minCharsSearch: number = 4;
  //expanded: boolean = false;
  jsonFilter: QueryExternalTagData[];
  onActiveSearch: boolean = false;



  @ViewChild('tableExternalTags', { static: false }) tableExternalTags: any;
  rowsTags: QueryExternalTagData[] = [];
  rowsTotals: QueryExternalTagTotals[] = [];
  columns = [];
  columnsDetails = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  messegesTable;


  @ViewChild('costumerSelect', { static: false }) costumerSelect: any;
  optionsCostumers: any = [];
  @ViewChild('productSelect', { static: false }) productSelect: any;
  optionsProducts: any = [];

  optionsLocations: any = [];
  optionsUsers: any = [];


  constructor(private formBuilder: FormBuilder, public queryExternalTagBusinessService: QueryExternalTagBusinessService, private toastyService: ToastyService, private config: NgSelectConfig) {
    this.config.notFoundText = '-Sin Coincidencias-';
    this.messegesTable = {
      'emptyMessage': 'No hay registros para mostrar',
      'totalMessage': 'Registros en total.'
    };

    //this.fetchExternalTags(null);
  }

  ngOnInit() {
    this.resetFormTraslados();
    this.fillLocalData();

  }

  fetchExternalTags(filter: any) {
    this.rowsTags = [];
    this.queryExternalTagBusinessService.GetTags(filter).then(x => {
      this.rowsTags = x.Tags;
      this.rowsTotals = x.Totals;

      if (this.rowsTags.length === 0) {
        Swal.fire('Error', 'No se encontró registros asociados a esta busqueda', 'error');
      } else {
        this.addToast({ title: 'Busqueda realizada', msg: 'Se encontraron ' + this.rowsTags.length + ' registros.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      }
      setTimeout(() => {
        this.onActiveSearch = false;
      }, 500);
      this.onActiveSearch = false;
    }).catch(x => {
      Swal.fire('Error', x.message, 'error');
    });
  }

  fillLocalData() {
    this.queryExternalTagBusinessService.GetLocations().then(x => {
      this.optionsLocations = x;
    }).catch(x => {
      Swal.fire('Error', x.message, 'error');
    });
    this.queryExternalTagBusinessService.GetUsers().then(x => {
      this.optionsUsers = x;
    }).catch(x => {
      Swal.fire('Error', x.message, 'error');
    });
  }

  /** 
   * Metodo encargado de filtrar por los campos que tienen datos para devolver registros precisos
   */
  async searchQuery() {
    if (!this.formSearchExternalTag.dirty) {
      Swal.fire('Advertencia', 'Debe ingresar por lo menos un filtro para buscar', 'warning');
      return;
    }
    for (let prop in this.jsonFilter) {
      if (this.jsonFilter[prop] !== null) {//

        if (this.formSearchExternalTag.get('CreationDateMin').value !== null) {
          const fecha = new Date(this.formSearchExternalTag.get('CreationDateMax').value);
          let fechaMin = new Date(this.formSearchExternalTag.get('CreationDateMin').value);

          if (fecha < fechaMin) {
            Swal.fire('Advertencia', 'La fecha de inicio debe ser menor o igual a la fecha de finalización.', 'warning');
            return;
          }
        }

        this.onActiveSearch = true;
        this.fetchExternalTags(this.jsonFilter);
        return;
      }
    }
    Swal.fire('Advertencia', 'Debe ingresar por lo menos un filtro para buscar', 'warning');
  }


  /**
   * Metodo para reset el formulario y dejar los campos en blanco.
   */
  resetFormTraslados() {
    this.formSearchExternalTag = this.formBuilder.group({
      OrderNumber: [],
      CostumerCode: [],
      ProductCode: [],
      Batch: [],
      CreationDateMin: [],
      CreationDateMax: [],
      LocationId: [],
      CreationUserDocument: [],
      BoxNumber: [],
      PalletNumber: []
    });
    this.formSearchExternalTag.valueChanges.subscribe((data) => {
      this.jsonFilter = data;
    });
  }


  searchCostumers() {
    let value = this.costumerSelect.searchTerm;

    if (value !== null && value.length >= this.minCharsSearch) {
      this.queryExternalTagBusinessService.GetCostumers(value.toLowerCase()).then(x => {
        this.optionsCostumers = x;
      }).catch(x => {
        Swal.fire('Error', x.message, 'error');
      });
    } else {
      this.optionsCostumers = [];
    }
  }


  searchProducts() {
    let value = this.productSelect.searchTerm;
    if (value !== null && value.length >= this.minCharsSearch) {
      this.queryExternalTagBusinessService.GetProducts(value.toLowerCase()).then(x => {
        this.optionsProducts = x;
      }).catch(x => {
        Swal.fire('Error', x.message, 'error');
      });
    } else {
      this.optionsProducts = [];
    }
  }


  async exportExcel() {
    if (this.rowsTags.length == 0) {
      Swal.fire('', 'Por favor realice una busqueda para poder descargar el resultado', 'warning');
      return;
    }

    let rowsTable: [] = JSON.parse(JSON.stringify(this.rowsTags));
    rowsTable.forEach((x:any)=>{
       delete(x.Details);
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rowsTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.addToast({ title: 'Descarga exitosa', msg: 'Se descargó el archivo excel con los registro de la tabla.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
    return XLSX.writeFile(wb, 'ConsultaEtiquetasExternas.xlsx');


  }

  toggleExpandRow(row,button) {
    if(button.firstElementChild.className == "fas fa-plus" )
      button.firstElementChild.className = "fas fa-minus";
    else
      button.firstElementChild.className = "fas fa-plus";

    this.tableExternalTags.rowDetail.toggleExpandRow(row);

  }
  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }

    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
}
