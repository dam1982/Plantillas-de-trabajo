import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryReturnOrder } from 'src/app/model/query-return-order';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { ServiceObject } from 'src/app/model/service-object';
import { ReturnOrderComponent } from '../return-order/return-order.component';
import { Field } from 'src/app/model/dynamicForms/field';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { ToastyType, ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { ReturnOrderBusinessService } from 'src/app/business/returns/return-order-business.service';
import { ReturnManagementBusinessService } from 'src/app/business/returns/return-management-business.service';
import { DatePipe } from '@angular/common';
import { ReturnOrder } from 'src/app/model/return-order';
import { ReturnComponent } from '../return/return.component';
import { TransferPT, TransferTypes } from 'src/app/model/transfer-pt';
import { TransferPtEditComponent } from '../../transfers/transfer-pt-edit/transfer-pt-edit.component';
import { ConfirmTransferEditComponent } from '../../transfers/confirm-transfer-edit/confirm-transfer-edit.component';

@Component({
  selector: 'app-return-management',
  templateUrl: './return-management.component.html',
  styleUrls: ['./return-management.component.scss']
})
export class ReturnManagementComponent implements OnInit, AfterViewInit {

  gridMapper: GridMapper<QueryReturnOrder>;

  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;
  @ViewChild('returnOrder', { static: false }) returnOrder: ReturnOrderComponent;
  @ViewChild('returnComponent', { static: false }) returnComponent: ReturnComponent;
  @ViewChild('transferPtEdit', { static: false }) EditTransferComponent: TransferPtEditComponent;
  @ViewChild('confirmTransferEdit', { static: false }) ConfirmTransferComponent: ConfirmTransferEditComponent;

  onActionSearch: boolean = false;

  AddReturnPermission: boolean = false;
  EditReturnPermission: boolean = false;
  CancelReturnPermission: boolean = false;
  ReturnPermission: boolean = false;
  ConfirmReturnPermission: boolean = false;
  ForwardingPermission: boolean = false;
  ConfirmForwardPermission: boolean = false;



  formFilterFields: Field[] = [
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": null,
        "User": null,
        "Service": null,
        "IpAddress": null,
        "Module": null,
        "Action": null,
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Nro Orden",
      "FieldName": "OrderNumber",
      "FieldType": 0,
      "CustomType": "text",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 4
    }, {
      "IdField": "Code",
      "DisplayField": "Name",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {
          "filters": { "Code": "", "Name": "" }
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "ReturnManagement",
        "Action": "GetCustomers",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Cliente",
      "FieldName": "CustomerCode",
      "FieldType": 6,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
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
        "Data": {
          "filters": { "Code": "", "Name": "" }
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "ReturnManagement",
        "Action": "GetProducts",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Producto",
      "FieldName": "ProductCode",
      "FieldType": 6,
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
        "Module": "ReturnManagement",
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
    }
    ,
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Fecha Modificación",
      "FieldName": "ModificationDate",
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
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": null,
        "User": null,
        "Service": null,
        "IpAddress": null,
        "Module": null,
        "Action": null,
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Nro Devolución",
      "FieldName": "ReturnNumber",
      "FieldType": 0,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 4
    }
  ];

  constructor(private businessOrder: ReturnOrderBusinessService, private businessManagement: ReturnManagementBusinessService, private datePipe: DatePipe, private toast: ToastService) {

    this.gridMapper = new GridMapper();
    this.GetReturns(null);

    this.AddReturnPermission = AppEnviroment.User.Profile.Permissions.indexOf("AddReturn") != -1;
    this.EditReturnPermission = AppEnviroment.User.Profile.Permissions.indexOf("EditReturn") != -1;
    this.CancelReturnPermission = AppEnviroment.User.Profile.Permissions.indexOf("CancelReturn") != -1;
    this.ReturnPermission = AppEnviroment.User.Profile.Permissions.indexOf("Return") != -1;
    this.ConfirmReturnPermission = AppEnviroment.User.Profile.Permissions.indexOf("ConfirmReturn") != -1;
    this.ForwardingPermission = AppEnviroment.User.Profile.Permissions.indexOf("Forwarding") != -1;
    this.ConfirmForwardPermission = AppEnviroment.User.Profile.Permissions.indexOf("ConfirmForward") != -1;
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  doNothing() { }

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    this.gridMapper.Columns = [
      { prop: 'ReturnNumber', maxWidth: 150, name: 'Nro Devolución' },
      { prop: 'OrderNumber', maxWidth: 100, name: 'Nro Orden' },
      { prop: 'ProductName', maxWidth: 300, name: 'Producto' },
      { prop: 'PackagesNumber', maxWidth: 100, name: 'Paquetes', canAutoResize: true },
      { prop: 'CustomerName', maxWidth: 300, name: 'Cliente', canAutoResize: true },
      { prop: 'CreationDate', name: 'Fecha Creación', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
      { prop: 'StateName', name: 'Estado' },
      { prop: 'ForwardingWarehouses', name: 'Bodegas Retorno' },
      { prop: 'ReturnWarehouses', name: 'Bodegas Devolución' },
      { prop: 'ModificationDate', name: 'Fecha Modificación', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
    ];
  }

  OpenReturn() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    this.returnComponent.LoadComponent(this.gridMapper.SelectedRows[0].ReturnNumber);
  }

  OnActivate(event) {

    if (event.type === 'dblclick') {
      if (!this.EditReturnPermission) {
        this.toast.AddToast("Advertencia", "Usted no tiene permitido editar una devolución", 10, ToastyType.warning, true);
      } else {
        this.EditReturn(false);
      }
    }
  }

  EditReturn(isNew) {
    if (isNew) {
      this.businessOrder.CurrentReturn = new ReturnOrder();
      this.returnOrder.LoadComponent();
      this.returnOrder.modalWindow.title = "Agregar Orden de Devolución";
      this.returnOrder.modalWindow.show();
    } else {
      if (this.gridMapper.SelectedRows.length == 0)
        return;

      if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
        this.toast.AddToast("Advertencia", "Solo se permite editar con estado de \"Creado\".", 10, ToastyType.warning, true);
        return;
      }

      this.returnOrder.modalWindow.title = 'Editar Orden de Devolución';
      this.businessOrder.GetReturn(this.gridMapper.SelectedRows[0].ReturnNumber).then(x => {
        this.returnOrder.LoadComponent();
        this.returnOrder.modalWindow.show();
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      });
    }
  }

  CancelReturn() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
      this.toast.AddToast("Advertencia", "Solo se permite anular con estado de \"Creado\".", 10, ToastyType.warning, true);
      return;
    }
    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea anular el alistamiento " + this.gridMapper.SelectedRows[0].ReturnNumber + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.businessOrder.CancelOrder(this.gridMapper.SelectedRows[0].ReturnNumber).then(x => {
          if (x) {
            this.toast.AddToast("Correcto", "Devolución Anulado", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo anular el alistamiento", 10, ToastyType.error, true);
          }
          this.GetReturns(null);
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
        return;
      }
    });


  }

  SearchFilter() {
    try {
      this.GetReturns(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.warning, true);
    }
  }

  GetReturns(filters: any) {
    if (!filters)
      filters = {}
    this.onActionSearch = true;
    this.businessManagement.GetReturns(filters).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionSearch = false;
    });
  }

  ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("OrdenesDevolución");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }



  ConfirmReturn() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;
    this.onActionSearch = true;
    this.businessManagement.GetTransfer(this.gridMapper.SelectedRows[0].ReturnNumber, "ConfirmReturn")
      .then(x => {
        this.ConfirmTransferComponent.LoadComponent(x);
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      }).finally(() => {
        this.onActionSearch = false;
      });


  }

  Forwarding() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    this.onActionSearch = true;
    this.businessManagement.GetTransfer(this.gridMapper.SelectedRows[0].ReturnNumber, "Forwarding")
      .then(transfer => {
        if (transfer == null) {
          transfer = new TransferPT(TransferTypes.Request);
          transfer.ReturnOrderId = this.gridMapper.SelectedRows[0].ReturnNumber;
        }
        this.EditTransferComponent.LoadComponent(transfer);

      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      }).finally(() => {
        this.onActionSearch = false;
      });



  }

  ConfirmForwarding() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;
    this.onActionSearch = true;
    this.businessManagement.GetTransfer(this.gridMapper.SelectedRows[0].ReturnNumber, "ConfirmForward")
      .then(x => {
        this.ConfirmTransferComponent.LoadComponent(x);
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      }).finally(() => {
        this.onActionSearch = false;
      });


  }


  OnEditTransferPtModal(hasChanges) {
    if (hasChanges) {
      this.gridMapper.SelectedRows = [];
      try {
        this.GetReturns(this.DynamicForm.GetFormData());
      } catch (error) {
        this.GetReturns(null);
      }
    }
  }
  CloseModal() {
    this.gridMapper.SelectedRows = [];

    try {
      this.GetReturns(this.DynamicForm.GetFormData());
    } catch (error) {
      this.GetReturns(null);
    }

  }
  CleanForm() {
    this.DynamicForm.CleanForm();
    this.GetReturns(null);
  }


}
