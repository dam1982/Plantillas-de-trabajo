import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferBusinessService } from 'src/app/business/queries/transfer-business.service';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { QueryTransferPT } from 'src/app/model/query-transfer-pt';
import * as XLSX from 'xlsx';
import { User } from 'src/app/model/user';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { QueryInternalTagTotals } from 'src/app/model/query-internal-tag-totals';

/**
 * Componenete con un formulario de busqueda y su tabla respectiva
 * para los traslados de los productos terminados.
 */
@Component({
  selector: 'app-transfer-pt',
  templateUrl: './transfers-finished-product.component.html',
  styleUrls: ['./transfers-finished-product.component.scss']
})
export class TransfersFinishedProductComponent implements OnInit {//AfterViewInit, OnDestroy,

  // Declaracion de variables para el formulario de busqueda
  formBuscarTraslado: FormGroup;
  jsonBusqueda: any;
  minCharsSearch: number = 4;
  expanded: boolean = false;
  onActiveSearch: boolean = false;

  // Variables encargadas de la estructura y datos de las tablas
  @ViewChild('tableTransfers', { static: false }) tableAttributes: any;
  rows: QueryTransferPT[] = [];
  rowsTotals: QueryInternalTagTotals[] = [];
  selected = [];
  columns = [{ prop: 'Id' }, { prop: 'CustomerName' }, { prop: 'OrderNumber' }, { prop: 'ProductName' }, { prop: 'TotalItems' }, { prop: 'TotalQuantity' }, { prop: 'Batch' }, { prop: 'DeliveryDate' }, { prop: 'ReceiptDate' }, { prop: 'StateName' }, { prop: 'DeliveryUserName' }, { prop: 'ReceiptUserName' }, { prop: 'SourceWarehouseName' }, { prop: 'DestinationWarehouseName' }];//,  { prop: 'ReceiptDate' },  { prop: 'Observations' }
  columnsDetails = [{ prop: 'PackageNumber' }, { prop: 'Quantity' }, { prop: 'Confirmed' }, { prop: 'ReasonName' }];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  @ViewChild('TransactionDateMinInput', { static: false }) DeliveryDateInput: any;

  messegesTable = {
    'emptyMessage': 'No hay registros para mostrar',
    'totalMessage': 'Registros en total.'
  };

  /**
   * Arrays que se encarga de guardar la información
   * que se va a buscar en los campos de texto.
   */
  optionsUsers: User[];
  optionsFilterUsers: any = [];
  optionsStates: any = [];
  /**
   * Arrays que muestran la informacion del filtro que se escriba
   * para mostrarlos en  los datalist
   */
  @ViewChild('customerSelect', { static: false }) customerSelect: any;
  optionsCustomers: any = [];
  @ViewChild('productSelect', { static: false }) productSelect: any;
  optionsProducts: any = [];
  @ViewChild('DestinationWareHouseSelect', { static: false }) DestinationWareHouseSelect: any;
  @ViewChild('SourceWareHouseSelect', { static: false }) SourceWareHouseSelect: any;
  optionsDestinationWareHouses: any = [];
  optionsSourceWareHouses: any = [];
  optionsOrders: any = [];

  dataNull: any;

  /** Clase encargada de recibir las inyecciones
   *  @param transferService: El servicio para obtener y manipular los datos.
   *  @param fb: FormBuilder es el encargado de construir los formularios.
   */
  constructor(private transferService: TransferBusinessService, private fb: FormBuilder, private toastyService: ToastyService) {

  }

  /**
 * Metodo que se ejecuta una vez cargue la página.
 */
  async ngOnInit() {
    this.resetFormTraslados();
    //Carga todos los datos de cada campo de texto para despues buscar y filtrar
    await this.fillOptions();

  }

  async fetchTransfersPT(filter) {
    this.rows = [];
    await this.transferService.QueryTransfers(filter).then(x => {
      this.rows = x.Tranfers;
      this.rowsTotals = x.Totals;
      if (this.rows.length === 0) {
        Swal.fire('Error', 'No se encontró registros asociados a esta busqueda', 'error');
      } else {
        this.addToast({ title: 'Busqueda realizada', msg: 'Se encontraron ' + x.Tranfers.length + ' registros.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      }
      setTimeout(() => {
        this.onActiveSearch = false;
      }, 500);

    }).catch(x => {
      Swal.fire('', '' + x, 'error');
    }).finally(() => this.onActiveSearch = false);
  }

  async exportExcel() {
    if (this.rows.length > 0) {

      let rowsTable: [] = JSON.parse(JSON.stringify(this.rows));
      rowsTable.forEach(x => {
        delete (x as QueryTransferPT).Details;
      });
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rowsTable);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      this.addToast({ title: 'Descarga exitosa', msg: 'Se descargó el archivo excel con los registro de la tabla.', timeout: 8000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      return XLSX.writeFile(wb, 'ConsultaTrasladosPT.xlsx');
    } else {
      Swal.fire('', 'Por favor realice una busqueda para poder descargar el resultado', 'warning');
    }

  }

  async fillOptions() {


    this.transferService.GetStates(null).then(x => {
      this.optionsStates = x;
    }).catch(x => {
      Swal.fire('', '' + x, 'error');
    });

    this.transferService.GetUsers(null).then(x => {
      this.optionsUsers = x;
    }).catch(x => {
      Swal.fire('', '' + x, 'error');
    });

    this.transferService.GetDestinationWarehouses(null).then(x => {
      this.optionsSourceWareHouses = x;
      this.optionsDestinationWareHouses = x;
    }).catch(x => {
      Swal.fire('', '' + x, 'error');
    });
  }
  /** 
   * Metodo encargado de filtrar por los campos que tienen datos para devolver registros precisos
   */
  async GetTransfers() {
    if (!this.formBuscarTraslado.dirty) {
      Swal.fire('Advertencia', 'Debe ingresar por lo menos un filtro para buscar', 'warning');
      return;
    }
    for (let prop in this.jsonBusqueda) {
      if (this.jsonBusqueda[prop] !== null && this.jsonBusqueda[prop] !== '') {

        if (this.formBuscarTraslado.get('TransactionDateMin').value !== null) {
          const fecha = new Date(this.formBuscarTraslado.get('TransactionDateMax').value);
          let fechaMin = new Date(this.formBuscarTraslado.get('TransactionDateMin').value);
          if (fecha < fechaMin) {
            Swal.fire('Advertencia', 'La fecha de recepción debe ser mayor a la fecha de envio.', 'warning');
            return;
          }
        }

        this.onActiveSearch = true;
        this.fetchTransfersPT(this.jsonBusqueda);
        return;
      }
    }
  }


  /**
   * Metodo para reset el formulario y dejar los campos en blanco.
   */
  resetFormTraslados() {
    this.formBuscarTraslado = this.fb.group({
      Id: [],
      CustomerCode: [],
      ProductCode: [],
      Batch: [],
      TransactionDateMin: [],
      TransactionDateMax: [],
      DeliveryUserDocument: [],
      ReceiptUserDocument: [],
      SourceWarehouseCode: [],
      DestinationWarehouseCode: [],
      StateId: [],
      OrderNumber: []
    });

    this.formBuscarTraslado.valueChanges.subscribe((data) => {
      this.jsonBusqueda = data;
    });
  }

  validatorEndDate(control: AbstractControl): { [key: string]: any } | null {

    if (control.value !== null) {
    }
    return null;


  }

  toggleExpandRow(row, button) {
    if (button.firstElementChild.className == "fas fa-plus")
      button.firstElementChild.className = "fas fa-minus";
    else
      button.firstElementChild.className = "fas fa-plus";
    this.tableAttributes.rowDetail.toggleExpandRow(row);
  }

  /**
  * Metodos para buscar en los campos de texto y mostrar en un datalist con los resultados.
  */

  searchCustomers() {
    let value = this.customerSelect.searchTerm;

    if (value !== null && value.length >= this.minCharsSearch) {
      this.transferService.GetCustomers(value.toLowerCase()).then(x => {
        this.optionsCustomers = x;
      }).catch(x => {
        Swal.fire('', '' + x, 'error');
      });
    } else {
      this.optionsCustomers = [];
    }
  }

  searchProducts() {
    let value = this.productSelect.searchTerm;
    if (value !== null && value.length >= this.minCharsSearch) {
      this.transferService.GetProducts(value.toLowerCase()).then(x => {
        this.optionsProducts = x;
      }).catch(x => {
        Swal.fire('', '' + x, 'error');
      });
    } else {
      this.optionsProducts = [];
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
