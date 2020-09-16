import { Component, OnInit, ViewChild } from '@angular/core';
import { Field } from 'src/app/model/dynamicForms/field';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryTransferRawMaterial } from 'src/app/model/query-transfer-raw-material';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { TransferManagementBusinessService } from 'src/app/business/transfers/transfer-management-business.service';
import { TransferRawMaterialBusinessService } from 'src/app/business/transfers/transfer-raw-material-business.service';
import { DatePipe } from '@angular/common';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import Swal from 'sweetalert2';
import { TransferRawMaterial } from 'src/app/model/transfer-raw-material';
import { TransferRawMaterialComponent } from '../transfer-raw-material/transfer-raw-material.component';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { ConfirmRawMaterialComponent } from '../../material-raw/confirm-raw-material/confirm-raw-material.component';

@Component({
  selector: 'app-transfer-management',
  templateUrl: './transfer-management.component.html',
  styleUrls: ['./transfer-management.component.scss']
})
export class TransferManagementComponent implements OnInit {

  gridMapper: GridMapper<QueryTransferRawMaterial>;

  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;
  @ViewChild('transferRawMaterial', { static: false }) transferRawMaterial: TransferRawMaterialComponent;
  @ViewChild('confirmTransferRawMaterial', { static: false }) confirmTransferRawMaterial: ConfirmRawMaterialComponent;


  onActionSearch: boolean = false;

  formFilterFields: Field[] = [
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro Traslado",
      "FieldName": "TransferNumber",
      "FieldType": 0,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 4
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Fecha Creación",
      "FieldName": "CreationDate",
      "FieldType": 8,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": "yyyy-MM-dd",
      "Width": 4
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro Requisición",
      "FieldName": "RequestNumber",
      "FieldType": 0,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 4
    },
    {
      "IdField": "Code",
      "DisplayField": "Name",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {},
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "TransferManagement",
        "Action": "GetWarehouses",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Bodega Origen",
      "FieldName": "SourceWarehouseCode",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 4,
      "MaxValue": 0,
      "Format": null,
      "Width": 4
    },
    {
      "IdField": "Code",
      "DisplayField": "Name",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {},
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "TransferManagement",
        "Action": "GetWarehouses",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Bodega Destino",
      "FieldName": "DestinationWarehouseCode",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 4,
      "MaxValue": 0,
      "Format": null,
      "Width": 4
    },
    {
      "IdField": "Key",
      "DisplayField": "Value",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {
          "filters": ""
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "TransferManagement",
        "Action": "GetStates",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Estado",
      "FieldName": "StateId",
      "FieldType": 3,
      "CustomType": "Cascade",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
      "Width": 4
    },


  ];
  PermissionAddTransfer: boolean = false;
  PermissionEditTransfer: boolean = false;
  PermissionCancelTransfer: boolean = false;
  PermissionReceiveTransfeRM: boolean = false;
  PermissionFlatFile: boolean = false;

  constructor(private businessRaw: TransferRawMaterialBusinessService, private businessManagement: TransferManagementBusinessService, private datePipe: DatePipe, private toast: ToastService) {

    this.gridMapper = new GridMapper();
    this.PermissionAddTransfer = AppEnviroment.User.Profile.Permissions.indexOf("AddTransferRM") != -1;
    this.PermissionEditTransfer = AppEnviroment.User.Profile.Permissions.indexOf("EditTransferRM") != -1;
    this.PermissionCancelTransfer = AppEnviroment.User.Profile.Permissions.indexOf("CancelTransferRM") != -1;
    this.PermissionReceiveTransfeRM = AppEnviroment.User.Profile.Permissions.indexOf("ReceiveTransfeRM") != -1;
    this.PermissionFlatFile = AppEnviroment.User.Profile.Permissions.indexOf("DownloadFile") != -1;

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }




  ngOnInit() {

    this.gridMapper.Columns = [
      { prop: 'TransferNumber', maxWidth: 130, name: 'Nro Traslado' },
      { prop: 'RequestNumber', maxWidth: 130, name: 'Nro Requisición' },
      { prop: 'StateName', maxWidth: 150, name: 'Estado' },
      { prop: 'CreationDate', name: 'Fecha Creación', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
      { prop: 'Delivery', name: 'Usuario Entrega' },
      { prop: 'CreationDate', name: 'Fecha Entrega', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
      { prop: 'Receipt', name: 'Usuario Recibo' },
      { prop: 'CreationDate', name: 'Fecha Recibo', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
      { prop: 'SourceWarehouseName', name: 'Bodega Origen' },
      { prop: 'DestinationWarehouseName', name: 'Bodega Destino' }
    ];
    this.GetTransfers(null);
  }



  EditTransfer(isNew) {
    if (isNew) {
      this.transferRawMaterial.LoadComponent(true, null);
    } else {
      if (this.gridMapper.SelectedRows.length == 0)
        return;

      if (this.gridMapper.SelectedRows[0].StateName === "Creado" || this.gridMapper.SelectedRows[0].StateName === "Confirmacion Parcial") {
        this.transferRawMaterial.LoadComponent(false, this.gridMapper.SelectedRows[0].TransferNumber);
      } else {
        this.toast.AddToast("Advertencia", "Solo se permite editar con estado de \"Creado\".", 10, ToastyType.warning, true);
        return;
      }
    }
  }

  CancelTransfer() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
      this.toast.AddToast("Advertencia", "Solo se permite anular con estado de \"Creado\".", 10, ToastyType.warning, true);
      return;
    }
    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea anular el " + this.gridMapper.SelectedRows[0].TransferNumber + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.businessRaw.CancelTransfer(this.gridMapper.SelectedRows[0].TransferNumber).then(x => {
          if (x) {
            this.toast.AddToast("Correcto", "Se Anuló correctamente", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo anular.", 10, ToastyType.error, true);
          }
          this.gridMapper.SelectedRows = [];
          this.GetTransfers(null);
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
        return;
      }
    });


  }

  SearchFilter() {
    try {
      this.GetTransfers(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.warning, true);
    }
  }

  GetTransfers(filters: any) {
    if (!filters)
      filters = {}
    this.onActionSearch = true;
    this.businessManagement.GetTransfers(filters).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionSearch = false;
    });
  }

  ReceiveTransfeRM() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    this.confirmTransferRawMaterial.LoadComponent(this.gridMapper.SelectedRows[0].TransferNumber);

  }

  ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("Traslados Materia Prima/Producto En Proceso");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

  FlatFile() {

  }

  OnActivate(event) {
    if (event.type === 'dblclick') {
      this.EditTransfer(false);
    }
  }

  CloseModal() {
    this.gridMapper.SelectedRows = [];
    try {
      this.GetTransfers(this.DynamicForm.GetFormData());
    } catch (error) {
      this.GetTransfers(null);
    }
  }
  CleanForm() {
    this.DynamicForm.CleanForm();
    this.GetTransfers(null);
  }
}
