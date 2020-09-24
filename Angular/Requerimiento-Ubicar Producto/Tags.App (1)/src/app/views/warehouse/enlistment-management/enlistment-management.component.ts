import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { GridMapper } from 'src/app/model/grid-mapper';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { QueryEnlistment } from 'src/app/model/query-enlistment';
import { EnlistmentManagementBusinessService } from 'src/app/business/warehouse/enlistment-management-business.service';
import { EnlistmentOrderComponent } from '../enlistment-order/enlistment-order.component';
import { Enlistment } from 'src/app/model/enlistment';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { EnlistmentOrderBusinessService } from 'src/app/business/warehouse/enlistment-order-business.service';
import { Field } from 'src/app/model/dynamicForms/field';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { DispatchBusinessService } from 'src/app/business/warehouse/dispatch-business.service';
@Component({
  selector: 'app-enlistment-management',
  templateUrl: './enlistment-Management.component.html',
  styleUrls: ['./enlistment-Management.component.scss']
})
export class EnlistmentManagementComponent implements OnInit, AfterViewInit {



  gridMapper: GridMapper<QueryEnlistment>;

  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;
  @ViewChild('enlistmentOrder', { static: false }) enlistmentOrder: EnlistmentOrderComponent;
  @ViewChild('dispatchComponent', { static: false }) dispatchComponent: DispatchComponent;
  onActiveSearch: boolean = false;

  VerifyEnlistmentPermission: boolean = false;
  DispatchPermission: boolean = false;




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
        "Module": "Transfer",
        "Action": "GetCustomers",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Cliente",
      "FieldName": "CustomerField",
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
        "Module": "Transfer",
        "Action": "GetProducts",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Producto",
      "FieldName": "ProductField",
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
        "Module": "Transfer",
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
      "Title": "Fecha Alistamiento",
      "FieldName": "EnlistmentDate",
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
      "Title": "Fecha Despacho",
      "FieldName": "DispatchDate",
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
      "Title": "Nro Alistamiento",
      "FieldName": "EnlistmentNumber",
      "FieldType": 0,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 3
    }
  ];

  constructor(private businessOrder: EnlistmentOrderBusinessService, private businessDispatch: DispatchBusinessService, private businessManagement: EnlistmentManagementBusinessService, private datePipe: DatePipe, private toast: ToastService) {

    this.gridMapper = new GridMapper();
    this.GetEnlistments({ "StateName": "Creado" });

    this.VerifyEnlistmentPermission = AppEnviroment.User.Profile.Permissions.indexOf("VerifyEnlistment") != -1;
    this.DispatchPermission = AppEnviroment.User.Profile.Permissions.indexOf("Dispatch") != -1;
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'EnlistmentNumber', maxWidth: 100, name: "Nro Alistamiento" },
      { prop: "OrderNumber", maxWidth: 100, name: "Nro Orden" },
      { prop: 'ProductName', maxWidth: 300, name: "Producto" },
      { prop: "BoxesNumber", maxWidth: 100, name: "Cajas", canAutoResize: true },
      { prop: "CustomerName", maxWidth: 300, name: "Cliente", canAutoResize: true },
      { prop: "EnlistmentDate", name: "Fecha Alistamiento", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd") } },
      { prop: "StateName", name: "Estado" },
      { prop: "DispatchDate", name: "Fecha Despacho", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd") } },
    ];
  }

  OpenDispatch(isDispatch: boolean) {

    if (this.gridMapper.SelectedRows.length == 0)
      return;

    this.dispatchComponent.modalWindowDispatch.title = "Verificar Alistamiento";
    this.businessDispatch.GetEnlistment(this.gridMapper.SelectedRows[0].EnlistmentNumber).then(x => {
      this.dispatchComponent.LoadComponent(isDispatch);
      this.dispatchComponent.modalWindowDispatch.show();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });


  }

  OnActivate(event) {
    if (event.type === 'dblclick') {
      this.EditEnlistment(false);
    }
  }

  EditEnlistment(isNew) {
    if (isNew) {
      this.businessOrder.CurrentEnlistment = new Enlistment();
      this.enlistmentOrder.LoadComponent();
      this.enlistmentOrder.modalWindow.title = "Agregar Orden de Alistamiento";
      this.enlistmentOrder.modalWindow.show();
    } else {
      if (this.gridMapper.SelectedRows.length == 0)
        return;

      if (this.gridMapper.SelectedRows[0].StateName !== "Alistado") {
        this.toast.AddToast("Advertencia", "Solo se permite editar con estado de \"Alistado\".", 10, ToastyType.warning, true);
        return;
      }

      this.enlistmentOrder.modalWindow.title = 'Editar Orden de Alistamiento';
      this.businessOrder.GetEnlistment(this.gridMapper.SelectedRows[0].EnlistmentNumber).then(x => {
        this.enlistmentOrder.LoadComponent();
        this.enlistmentOrder.modalWindow.show();
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      });
    }
  }

  CancelEnlistment() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea anular el alistamiento " + this.gridMapper.SelectedRows[0].EnlistmentNumber + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.businessOrder.CancelEnlistment(this.gridMapper.SelectedRows[0].EnlistmentNumber).then(x => {
          if (x) {
            this.toast.AddToast("Correcto", "Alistamiento Anulado", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo anular el alistamiento", 10, ToastyType.error, true);
          }
          this.GetEnlistments({ "StateName": "Creado" });
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
        return;
      }
    });


  }


  SearchFilter() {
    try {
      this.GetEnlistments(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.warning, true);
    }
  }

  GetEnlistments(filters: any) {
    this.onActiveSearch = true;
    this.businessManagement.GetEnlistments(filters).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActiveSearch = false;
    });
  }

  ExportExcel() {
    try {
      this.gridMapper.ExportExcelDisplayColumns("OrdenesAlistamiento");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

  CloseModal() {
    this.gridMapper.SelectedRows = [];
    this.GetEnlistments({ "StateName": "Creado" });
  }

}
