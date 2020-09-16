import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerFilter } from '../../../model/customer-filter';
import { User } from '../../../model/user'
import { QueryInternalTag } from '../../../model/query-internal-tag'
import { WarehouseFilter } from '../../../model/ware-house-filter'
import { QueryInternalTagBusinessService } from '../../../business/queries/query-internal-tag-business.service'
import { ProductionLines } from '../../../model/production-lines';
import { NgForm } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import Swal from 'sweetalert2';
import { QueryInternalTagData } from 'src/app/model/query-internal-tag-data';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryInternalTagTotals } from 'src/app/model/query-internal-tag-totals';


@Component({
  selector: 'app-query-internal-tag',
  templateUrl: './query-internal-tag.component.html',
  styleUrls: ['./query-internal-tag.component.scss']
})
export class QueryInternalTagComponent implements OnInit {
  @ViewChild("dataTable", { static: false }) dataTable: DatatableComponent;
  gridMapper: GridMapper<QueryInternalTagData>;
  gridTotals: GridMapper<QueryInternalTagTotals>;
  @ViewChild('WarehouseSelect', { static: false }) WarehouseSelect: any;
  @ViewChild('costumerSelect', { static: false }) costumerSelect: any;
  @ViewChild('productSelect', { static: false }) productSelect: any;
  @ViewChild('LineProduct', { static: false }) LineProduct: any;
  // Declaracion de variables para el formulario de busqueda
  formBuscarTraslado: FormGroup;
  jsonBusqueda: any;
  minCharsSearch: number = 4;
  expanded: boolean = false;
  onActiveSearch: boolean = false;
  optionsCustomers: any = [];
  optionsProducts: any = [];
  productLine: ProductionLines[];
  UserQuery: User[];
  WarehouseQuery: WarehouseFilter[];
  customerQuery: CustomerFilter[];
  QueryInternalTagQuery: QueryInternalTag;


  constructor(private Business: QueryInternalTagBusinessService, private fb: FormBuilder, private toastyService: ToastyService) {
    this.searchLines();
    this.GetCollectionUsers();
    this.resetFormTraslados();
    this.searchWarehouses();
  }


  ngOnInit() {
    this.gridMapper = new GridMapper();
    this.gridTotals = new GridMapper();

    this.gridMapper.Columns = [
      { prop: "OrderNumber",width:80, name: 'Nro. Orden' },
      
      { prop: "CustomerName", width:200,name: 'Cliente' },
      { prop: "ProductName",width:200, name: 'Producto' },
      { prop: "PackageNumber",width:60, name: '# Paq.' },
      { prop: "Quantity", width:100,name: 'Cantidad' },
      { prop: "NumberCopiesPrint",width:100, name: 'Copias' },
      { prop: "Batch", width:150,name: 'Lote' },
      { prop: "CreationDate", width:150,name: 'Fecha' },
      { prop: "ProductionLineName", width:60,name: 'Línea' },
      
      { prop: "WarehouseName",width:150, name: 'Bodega' },
      { prop: "PackerName", width:150,name: 'Usuario' },
      { prop: "RePrint",width:80, name: 'Reimpresión' },
      { prop: "Edition", width:200,name: 'Usuario Reimpresión' },
      { prop: "BarCode", width:120,name: 'Código de Barras' },
    ];

    this.gridTotals.Columns = [
      { prop: "Batch", name: 'Lote' },
      { prop: "TagsQuantity", name: 'Cantidad Etiquetas' },
      { prop: "ProductQuantity", name: 'Cantidad Producto' },
    ];


  }
  /**
   * Metodo para reset el formulario y dejar los campos en blanco.
   */
  resetFormTraslados() {
    this.formBuscarTraslado = this.fb.group({
      CostumerCode: [],
      ProductCode: [],
      WarehouseCode: [],
      NoOrden: [],
      user: [],
      Nopackage: [],
      batch: [],
      fecha1: null,
      fecha2: null,
      line: []

    });
    this.formBuscarTraslado.valueChanges.subscribe((data) => {
      this.jsonBusqueda = data;
    });
  }
  searchCustomers() {
    let value = this.costumerSelect.searchTerm;
    if (!value || value.length < this.minCharsSearch) {
      return null;
    } else {
      this.optionsCustomers = [];
    }

    this.Business.GetCollectionCustomers(value.toLowerCase()).then((x: CustomerFilter[]) => {
      this.optionsCustomers = x;
    });

  }
  searchProducts() {
    let value = this.productSelect.searchTerm;
    if (!value || value.length < this.minCharsSearch) {
      return null;
    }

    if (value !== null && value.length >= this.minCharsSearch) {
      this.Business.GetCollectionProducts(value.toLowerCase()).then(x => {
        this.optionsProducts = x;
      }).catch(x => {
        this.addToast({ title: 'Error', msg: x, timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      });
    } else {
      this.optionsProducts = [];
    }

  }
  async searchLines() {
    this.productLine = await this.Business.GetCollectionProductLines(null);
  }
  async GetCollectionUsers() {
    this.UserQuery = await this.Business.GetCollectionUsers(null);
  }
  searchWarehouses() {   
    this.Business.GetCollectionWarehouses(null).then(x => {
       this.WarehouseQuery = x;
     }).catch(x => {
        this.addToast({ title: 'Error', msg: x, timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
     });
  }
  async GetQueryInternalTag(forma: NgForm) {
    var NoOrden = forma.value.NoOrden;
    var Client = forma.value.CostumerCode;
    var Product = forma.value.ProductCode;
    var Batch = forma.value.batch;
    var CreationDateMin = forma.value.fecha1;
    var CreationDateMax= forma.value.fecha2;
    var Line = forma.value.line;
    var User = forma.value.user;
    var NPack = forma.value.Nopackage;
    var Wirehouse = forma.value.WarehouseCode;

    let filters = {
      OrderNumber: NoOrden,
      CustomerCode: Client,
      ProductCode: Product,
      Batch: Batch,
      CreationDateMin: CreationDateMin,
      CreationDateMax:CreationDateMax,
      ProductionLineId: Line,
      PackerCode: User,
      PackageNumber: NPack,
      WarehouseCode: Wirehouse
    };

    for (var clave in filters) {
      if (filters[clave] == "" || filters[clave] == "Vacío" || filters[clave] == null) {
        delete filters[clave];
      }
    }


    setTimeout(() => {
      this.onActiveSearch = false;
    }, 500);


    if (Object.keys(filters).length === 0) {
      Swal.fire('Advertencia', 'Debe ingresar por lo menos un filtro para buscar', 'warning');
      return;
    }

    this.QueryInternalTagQuery = await this.Business.GetCollectionQueriInternalTags(filters);
    this.gridMapper.DisplayRows = this.QueryInternalTagQuery.Tags;
    this.gridTotals.DisplayRows = this.QueryInternalTagQuery.Totals;

    if (this.gridMapper.DisplayRows.length === 0) {
      Swal.fire('Error', 'No se encontraron registros asociados a esta búsqueda', 'error');
    }
    else {
      this.addToast({ title: 'Búsqueda realizada', msg: 'Se encontraron ' + this.gridMapper.DisplayRows.length + ' registros.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
    }
    setTimeout(() => {
      this.onActiveSearch = false;
    }, 500);

    this.onActiveSearch = true;

  }

  rows: any[];

  async exportExcel() {
    if (this.gridMapper.DisplayRows.length > 0) {
      let rowsTable: [] = JSON.parse(JSON.stringify(this.gridMapper.DisplayRows));
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rowsTable);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      this.addToast({ title: 'Descarga exitosa', msg: 'Se descargó el archivo excel con los registro de la tabla.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      return XLSX.writeFile(wb, 'ConsultaEtiquetasInternas.xlsx');
    } else {
      Swal.fire('', 'Por favor realice una busqueda para poder descargar el resultado', 'warning');
    }

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



