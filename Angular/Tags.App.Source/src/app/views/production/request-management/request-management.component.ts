import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RequestManagementBusinessService } from 'src/app/business/production/request-management-business.service';
import { DatePipe } from '@angular/common';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryMaterialsRequest } from 'src/app/model/query-materials-request';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { Field } from 'src/app/model/dynamicForms/field';
import Swal from 'sweetalert2';
import { MaterialsRequestComponent } from '../materials-request/materials-request.component';
import { MaterialRequestBusinessService } from 'src/app/business/production/material-request-business.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.scss']
})
export class RequestManagementComponent implements OnInit, AfterViewInit {

  gridMapper: GridMapper<QueryMaterialsRequest>;
  onActionSearch: boolean = false;
  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;
  @ViewChild('MaterialsRequest', { static: false }) MaterialsRequest: MaterialsRequestComponent;

  formFilterFields: Field[] = [
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro Requisición",
      "FieldName": "RequestNumber",
      "FieldType": 1,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 3
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Fecha Transacción",
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
        "Module": "RequestManagement",
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
      "Width": 5
    },
    {
      "IdField": "Code",
      "DisplayField": "Name",
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
        "Module": "RequestManagement",
        "Action": "GetWarehouses",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Bodega Materiales",
      "FieldName": "MaterialsWarehouseCode",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
      "Width": 5
    },
    {
      "IdField": "Code",
      "DisplayField": "Name",
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
        "Module": "RequestManagement",
        "Action": "GetWarehouses",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Bodega Solicitud",
      "FieldName": "DestinationWarehouseCode",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
      "Width": 5
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
        "Module": "RequestManagement",
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
      "Width": 2
    }

  ];

  constructor(private business: RequestManagementBusinessService, private materialRequestBusiness: MaterialRequestBusinessService, private datePipe: DatePipe, private toast: ToastService) {
    this.gridMapper = new GridMapper();
    this.GetMaterialsRequest(null);

  }

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);

    this.gridMapper.Columns = [
      { prop: 'RequestNumber', maxWidth: 150, name: 'Nro Requisisión' },
      { prop: 'CreationDate', name: 'Fecha', pipe: { transform: (value) => this.datePipe.transform(value, 'yyyy-MM-dd') } },
      { prop: 'CreationUserName', maxWidth: 300, name: 'Usuario Solicitud' },
      { prop: 'StateName', name: 'Estado' },
      { prop: 'MaterialsWarehouseName', name: 'Bodega Materiales' },
      { prop: 'DestinationWarehouseName', name: 'Bodegas Solicitud' },
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  GetMaterialsRequest(filters: any) {
    if (!filters)
      filters = {}
    this.onActionSearch = true;
    this.business.GetMaterialsRequest(filters).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    }).finally(() => {
      this.onActionSearch = false;
    });
  }

  SearchFilter() {
    try {
      this.GetMaterialsRequest(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.warning, true);
    }
  }

  CleanForm() {
    this.DynamicForm.CleanForm();
    this.GetMaterialsRequest(null);
  }

  OnActivate(event) {

    if (event.type === 'dblclick') {
      this.EditRequest(false);

    }
  }

  EditRequest(isNew) {
    let requestNumber: number = 0;

    if (!isNew) {
      if (this.gridMapper.SelectedRows.length == 0)
        return;
      requestNumber = this.gridMapper.SelectedRows[0].RequestNumber;
    }

    this.materialRequestBusiness.GetMaterialsRequest(requestNumber).then(x => {
      this.MaterialsRequest.ModalWindow.title = requestNumber == 0 ? "Agregar Requisición de Materiales" : "Editar Requisición de Materiales";
      this.MaterialsRequest.LoadComponent();
    });
  }


  CloseModal(hasChanges) {
    if (!hasChanges)
      return;

    this.gridMapper.SelectedRows = [];
    try {
      this.GetMaterialsRequest(this.DynamicForm.GetFormData());
    } catch (error) {
      this.GetMaterialsRequest(null);
    }
  }

  CancelRequest() {
    if (this.gridMapper.SelectedRows.length == 0)
      return;

    if (this.gridMapper.SelectedRows[0].StateName !== "Creado") {
      this.toast.AddToast("Advertencia", "Solo se permite anular en estado \"Creado\".", 10, ToastyType.warning, true);
      return;
    }
    Swal.fire({
      title: "Confirmar Acción",
      text: "¿Desea anular la requisición " + this.gridMapper.SelectedRows[0].RequestNumber + "?",
      type: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCloseButton: false,
      showCancelButton: true
    }).then((confirm) => {

      if (!confirm.dismiss) {
        this.materialRequestBusiness.CancelMaterialsRequest(this.gridMapper.SelectedRows[0].RequestNumber).then(x => {
          if (x)
            this.toast.AddToast("Correcto", "Requisición anulada correctamente.", 10, ToastyType.success, true);
          else
            this.toast.AddToast("Error", "No se pudo anular la requisición.", 10, ToastyType.error, true);

          this.GetMaterialsRequest(null);
        }).catch(x => {
          Swal.fire("Error", "" + x, 'error');
        });
      }
    });
  }


  ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("RequisicionesMaterial");
      this.toast.AddToast("Información", "Se ha realizado la descarga.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

}
