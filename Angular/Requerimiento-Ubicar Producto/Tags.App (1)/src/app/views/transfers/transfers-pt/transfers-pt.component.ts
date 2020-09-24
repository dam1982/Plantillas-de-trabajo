import { Component, OnInit, ViewChild } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { TransferBusinessService } from 'src/app/business/queries/transfer-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { TransferPT, TransferTypes } from 'src/app/model/transfer-pt';
import { QueryTransferPT } from 'src/app/model/query-transfer-pt';
import { CustomerFilter } from 'src/app/model/customer-filter';
import { User } from 'src/app/model/user';
import { ProductFilter } from 'src/app/model/product-filter';
import { State } from 'src/app/model/state';
import * as XLSX from 'xlsx';
import { TransferPtEditComponent } from '../transfer-pt-edit/transfer-pt-edit.component';

@Component({
  selector: 'app-transfers-pt',
  templateUrl: './transfers-pt.component.html',
  styleUrls: ['./transfers-pt.component.scss']
})
export class TransfersPTComponent implements OnInit {


  @ViewChild('CustomerSelect', { static: false }) CustomerSelect: any;
  @ViewChild('ProductSelect', { static: false }) ProductSelect: any;

  optionsCustomers: CustomerFilter[] = [];
  optionsProducts: ProductFilter[] = [];
  optionsUsers: User[] = [];
  optionsStates: State[] = [];

  minCharsSearch: number = 5;

  onActiveSearch: boolean = false;
  CurrentQueryTransfer: QueryTransferPT;
  gridMapper: GridMapper<QueryTransferPT>;

  @ViewChild('transferPtEdit', { static: false }) EditTransferComponent: TransferPtEditComponent;


  constructor(private business: TransferBusinessService, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.CurrentQueryTransfer = new QueryTransferPT();
    this.FillLists();
    this.GetTransfers({});
  }


  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'Id', flexGrow: 1, name: "Id" },
      { prop: "CustomerName", flexGrow: 3, name: 'Cliente' },
      { prop: 'ProductName', flexGrow: 2, name: 'Producto' },
      { prop: "Batch", flexGrow: 2, name: 'Lote' },
      { prop: "DeliveryDate", flexGrow: 2, name: 'Fecha Entrega' },
      { prop: "ReceiptDate", flexGrow: 2, name: 'Fecha Recibo' },
      { prop: "PackagesNumber", flexGrow: 2, name: 'Consecutivos' },
      { prop: "StateName", flexGrow: 2, name: 'Estado' },
      { prop: "DeliveryUserName", flexGrow: 3, name: 'Usuario Entrega' },
      { prop: "ReceiptUserName", flexGrow: 3, name: 'Usuario Recibe' }
    ];
  }

  GetTransfers(filter) {
    this.business.GetTransfers(filter).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "No se pudieron obtener registros: " + x, 'error');
    }).finally(() => {
      this.onActiveSearch = false;
    });

  }

  GetTransfersValidation() {
    for (let prop in this.CurrentQueryTransfer) {
      if (this.CurrentQueryTransfer[prop] !== null && this.CurrentQueryTransfer[prop] !== '') {
        if (this.CurrentQueryTransfer.DeliveryDateMin !== null) {
          const fechaMax = new Date(this.CurrentQueryTransfer.DeliveryDateMax);
          let fechaMin = new Date(this.CurrentQueryTransfer.DeliveryDateMin);
          if (fechaMax < fechaMin) {
            Swal.fire('Advertencia', 'La fecha de inicio debe ser mayor a la fecha de fin.', 'warning');
            return;
          }
        }
        this.onActiveSearch = true;
        this.GetTransfers(this.CurrentQueryTransfer);
        return;
      }
    }
    Swal.fire('Advertencia', 'Debe ingresar por lo menos un filtro para buscar', 'warning');
  }


  OnActivate(event) {
    if (event.type === 'dblclick') {
      this.EditTransfer(false);
    }
  }

  EditTransfer(isNew) {
    if (isNew) 
    {
      this.EditTransferComponent.LoadComponent(new TransferPT(TransferTypes.Transfer));
    } else {
      if (this.gridMapper.SelectedRows.length == 0) {
        this.toast.AddToast("Advertencia", "Seleccione una fila para editar", 10, ToastyType.warning, true);
        return;
      }

      this.business.GetTransfer(this.gridMapper.SelectedRows[0].Id).then(x => {
        this.EditTransferComponent.LoadComponent(x);      
      }).catch(x => {
        Swal.fire('Error', x.message, 'error');
      });
    }
  }

  FillLists() {
    this.business.GetUsers(null).then(x => {
      this.optionsUsers = x;
    }).catch(x => {
      Swal.fire('Error', "Error obteniendo los usuarios " + x, 'error');
    });

    this.business.GetStates(null).then(x => {
      this.optionsStates = x;
    }).catch(x => {
      Swal.fire('Error', "Error obteniendo los estados " + x, 'error');
    });
  }


  GetCustomers() {
    let value = this.CustomerSelect.valueAccessor.searchTerm;
    if (value !== null && value.length >= this.minCharsSearch) {
      this.business.GetCustomers(value).then(x => {
        this.optionsCustomers = x;
      }).catch(x => {
        Swal.fire('Error', x, 'error');
      });
    }

  }

  GetProducts() {
    let value = this.ProductSelect.valueAccessor.searchTerm;
    if (value !== null && value.length >= this.minCharsSearch) {
      this.business.GetProducts(value).then(x => {
        this.optionsProducts = x;
      }).catch(x => {
        Swal.fire('Error', x, 'error');
      });
    }
  }


  exportExcel() {
    if (this.gridMapper.DisplayRows.length > 0) {
      var wss = XLSX.utils.json_to_sheet([
        this.gridMapper.DisplayRows
      ], { header: [] });

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.gridMapper.DisplayRows);
      ws.A1.v = 'Id';
      ws.B1.v = 'Id Linea Orden ';
      ws.C1.v = 'Nro Orden';
      ws.D1.v = 'Codigo Cliente';
      ws.E1.v = 'Nombre Cliente';
      ws.F1.v = 'Codigo Producto';
      ws.G1.v = 'Nombre Producto';
      ws.H1.v = 'Cantidad total';
      ws.I1.v = 'Total items';
      ws.J1.v = 'Lote';
      ws.K1.v = 'Fecha de inicio';
      ws.L1.v = 'Numeros de paquetes';
      ws.M1.v = 'Bodega origen';
      ws.N1.v = 'CodigoBodega origen';
      ws.O1.v = 'Codigo Bodega destino';
      ws.P1.v = 'Bodega destino';
      ws.Q1.v = 'Documento usuario envio';
      ws.R1.v = 'Nombre usuario envio';
      ws.S1.v = 'Fecha recepción';
      ws.T1.v = 'Usuario documento recepcion';
      ws.U1.v = 'Usuario nombre recepcion';
      ws.V1.v = 'Id estado';
      ws.W1.v = 'Estado';
      ws.X1.v = 'Detalles';
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      this.toast.AddToast('Descarga exitosa', 'Se descargó el archivo excel con los registro de la tabla.', 10, ToastyType.success, true);
      return XLSX.writeFile(wb, 'Traslados Producto Terminado.xlsx');
    } else {
      Swal.fire('', 'Por favor realice una busqueda para poder descargar el resultado', 'warning');
    }

  }

  OnCloseEditModal(hasChanges)
  {
    if(hasChanges)  
      this.GetTransfers({});
  }
}
