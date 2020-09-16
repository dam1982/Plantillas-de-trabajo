import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { GridMapper } from 'src/app/model/grid-mapper';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { DeallocationManagementBusinessService } from 'src/app/business/warehouse/deallocation-management-business.service';
import { Deallocation } from 'src/app/model/deallocation';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { DeallocationOrderBusinessService } from 'src/app/business/warehouse/deallocation-order-business.service';
import { Field } from 'src/app/model/dynamicForms/field';
import { AppEnviroment } from 'src/app/model/app-enviroment';

import { DispatchBusinessService } from 'src/app/business/warehouse/dispatch-business.service';
import { QueryDeallocation } from 'src/app/model/query-deallocation';
import { DeallocationOrderComponent } from '../../warehouse/deallocation-order/deallocation-order.component';
import { DeallocateComponent } from '../../warehouse/deallocate/deallocate.component';
import { DeallocateBusinessService } from 'src/app/business/warehouse/deallocate-business.service';
@Component({
  selector: 'app-deallocation-management',
  templateUrl: './deallocation-management.component.html',
  styleUrls: ['./deallocation-management.component.scss']
})
export class DeallocationManagementComponent implements OnInit, AfterViewInit {


  gridMapper: GridMapper<QueryDeallocation>;
  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;

  @ViewChild('DeallocationOrder', { static: false }) DeallocationOrder: DeallocationOrderComponent;
  @ViewChild('Deallocate', { static: false }) Deallocate: DeallocateComponent;

  onActionSearch: boolean = false;
  onActionDeallocate: boolean = false;



  AddDeallocationPermission: boolean = false;
  EditDeallocationPermission: boolean = false;
  CancelDeallocationPermission: boolean = false;
  DeallocatePermission: boolean = false;

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
        "Module": "DeallocationManagement",
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
        "Data": {
          "filters": { "Code": "", "Name": "" }
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "DeallocationManagement",
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
        "Module": "DeallocationManagement",
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
      "Title": "Fecha Desasignación",
      "FieldName": "DeallocationDate",
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
        "Module": "DeallocationManagement",
        "Action": "GetStorageTypes",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Tipo",
      "FieldName": "StorageTypeId",
      "FieldType": 3,
      "CustomType": "Cascade",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
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
      "Title": "Nro Desasignación",
      "FieldName": "DeallocationNumber",
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

  constructor(private businessOrder: DeallocationOrderBusinessService, private businessDispatch: DispatchBusinessService, private businessDeallocate: DeallocateBusinessService, private businessManagement: DeallocationManagementBusinessService, private datePipe: DatePipe, private toast: ToastService) {

    this.gridMapper = new GridMapper();
    this.GetDeallocations(null);
    this.AddDeallocationPermission = AppEnviroment.User.Profile.Permissions.indexOf("AddDeallocation") != -1;
    this.EditDeallocationPermission = AppEnviroment.User.Profile.Permissions.indexOf("EditDeallocation") != -1;
    this.CancelDeallocationPermission = AppEnviroment.User.Profile.Permissions.indexOf("EditDeallocation") != -1;
    this.DeallocatePermission = AppEnviroment.User.Profile.Permissions.indexOf("Deallocate") != -1;
  }



  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'DeallocationNumber', maxWidth: 100, name: "Nro Desasignación" },
      { prop: "OrderNumber", maxWidth: 100, name: "Nro Orden" },
      { prop: 'ProductName', maxWidth: 300, name: "Producto" },
      { prop: "Numeration", maxWidth: 100, name: "Numeración", canAutoResize: true },
      { prop: "CustomerName", maxWidth: 300, name: "Cliente", canAutoResize: true },
      { prop: "CreationUser", maxWidth: 300, name: "Usuario Creación", canAutoResize: true },
      { prop: "CreationDate", maxWidth: 200, name: "Fecha Creación", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd") } },
      { prop: "StateName", name: "Estado" },
      { prop: "StorageTypeName", name: "Tipo" },
      { prop: "DeallocationDate", maxWidth: 200, name: "Fecha Desasignación", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd") } },
      
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  OnActivate(event) {
    if (event.type === 'dblclick') {
      this.EditDeallocation(false);
    }
  }

  EditDeallocation(isNew) {
    if (isNew) {
      this.businessOrder.CurrentDeallocation = new Deallocation();
      this.DeallocationOrder.LoadComponent();
      this.DeallocationOrder.modalWindow.title = "Agregar Orden de Desasignación";
      this.DeallocationOrder.modalWindow.show();
    } else {
      if (this.gridMapper.SelectedRows.length == 0)
        return;

      if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
        Swal.fire("Advertencia", "Solo se permite editar con estado de Creado.", 'warning');
        //this.toast.AddToast("Advertencia", "Solo se permite editar con estado de Creado.", 10, ToastyType.warning, true);
        return;
      }

      this.DeallocationOrder.modalWindow.title = 'Editar Orden de Desasignación';
      this.businessOrder.GetDeallocation(this.gridMapper.SelectedRows[0].DeallocationNumber).then(x => {
        this.DeallocationOrder.LoadComponent();
        this.DeallocationOrder.modalWindow.show();
      }).catch(x => {
        Swal.fire("Error", "" + x, 'error');
      });
    }
  }

  CancelOrder() {
    if (this.gridMapper.SelectedRows.length == 0) {
      return;
    }

    if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
      Swal.fire("Advertencia", "Solo se permite anular con estado de Creado.", 'warning');
      return;
    }

    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea anular la desasignación " + this.gridMapper.SelectedRows[0].DeallocationNumber + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.businessOrder.CancelOrder(this.gridMapper.SelectedRows[0].DeallocationNumber).then(x => {
          if (x) {
            this.toast.AddToast("Correcto", "Desasignación Anulada", 10, ToastyType.success, true);
          } else {
            this.toast.AddToast("Error", "No se pudo anular la desasignación", 10, ToastyType.error, true);
          }
          this.GetDeallocations(null);
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
        return;
      }
    });
  }

  OpenDeallocate() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    if (this.gridMapper.SelectedRows[0].StateName !== "Creado" && this.gridMapper.SelectedRows[0].StateName !== "En proceso") {
      Swal.fire("Advertencia", "Solo se permite desasignar con estado de \"Creado\" o \"En Proceso\".", 'warning');
      return;
    }
    this.onActionDeallocate = true;

    this.DeallocationOrder.modalWindow.title = 'Desasignación';
    this.businessDeallocate.GetDeallocation(this.gridMapper.SelectedRows[0].DeallocationNumber).then(x => {
      this.Deallocate.LoadComponent();
      this.Deallocate.modalWindow.show();
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionDeallocate = false;
    })

  }


  SearchFilter() {
    try {
      this.GetDeallocations(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.error, true);
    }
  }

  GetDeallocations(filters: any) {
    if(!filters)
      filters = { };


    this.onActionSearch = true;
    this.businessManagement.GetDeallocations(filters).then(x => {

      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "No se pudo obtener las desasignaciones: " + x, 'error');
    }).finally(() => {
      this.onActionSearch = false;
    });
  }

  async ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("OrdenesDesasignación");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

  CloseModal() {
    this.gridMapper.SelectedRows = [];
    try {
      this.GetDeallocations(this.DynamicForm.GetFormData());
    } catch (error) {
      this.GetDeallocations(null);
    }
  }
  CleanForm()
  {
    this.DynamicForm.CleanForm();
    this.GetDeallocations(null);
  }

}

