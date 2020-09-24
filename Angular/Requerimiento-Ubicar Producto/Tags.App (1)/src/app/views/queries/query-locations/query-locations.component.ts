import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Field } from 'src/app/model/dynamicForms/field';
import { QueryLocation } from 'src/app/model/query-location';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryLocationsBusinessService } from 'src/app/business/queries/query-location-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-query-locations',
  templateUrl: './query-locations.component.html',
  styleUrls: ['./query-locations.component.scss']
})
export class QueryLocationsComponent implements OnInit, AfterViewInit {
  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;

  gridMapper: GridMapper<QueryLocation>;
  onActionSearch: boolean = false;

  
  constructor(private business : QueryLocationsBusinessService,private toast: ToastService) {
    this.gridMapper = new GridMapper();

   }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'LocationName', maxWidth: 150, name: "Ubicación" },
      { prop: "PalletNumber", maxWidth: 100, name: "Nro. Estiba" },
      { prop: 'OrderNumber', maxWidth: 100, name: "Nro. Orden" },
      { prop: "ProductName",  name: "Producto", canAutoResize: true },
      { prop: "CustomerName", name: "Cliente", canAutoResize: true },      
      { prop: "QuantityBoxes",maxWidth: 100, name: "Cant. Cajas" },      
    ];


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  formFilterFields: Field[] = [
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro. Orden",
      "FieldName": "OrderNumber",
      "FieldType": 1,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 2
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
        "Module": "QueryLocations",
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
      "MinValue": 5,
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
          "filters": { "Code": "", "Name": "" }
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "QueryLocations",
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
      "MinValue": 5,
      "MaxValue": 0,
      "Format": null,
      "Width": 5
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro. Estiba",
      "FieldName": "PalletNumber",
      "FieldType": 1,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 2
    },   
    {
      "IdField": "LocationId",
      "DisplayField": "LocationName",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {
          "filters": null
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "QueryLocations",
        "Action": "GetLocations",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Ubicaciones",
      "FieldName": "LocationId",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
      "Width": 3
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Disponible",
      "FieldName": "Available",
      "FieldType": 4,
      "CustomType": "",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 2
    },
    
  ];

  GetQuery(filters: any)
  {
    this.onActionSearch = true;
    this.business.GetQueryLocations(filters).then(x => {
      this.gridMapper.DisplayRows = x;
    }).catch(x => {
      Swal.fire("Error", "No se encontraron registros con los filtros ingresados." + x, 'error');
    }).finally(() => {
      this.onActionSearch = false;
    });
  }

  Search()
  {
    
    try {
      this.GetQuery(this.DynamicForm.GetFormData());
    } catch (error) {
      this.toast.AddToast("Advertencia", error, 10, ToastyType.warning, true);
    }
  }

  async ExportExcel() {
    try {
      this.gridMapper.ExportExcelAllColums("ConsultaUbicaciones");
      this.toast.AddToast("Información", "Exportación realizada con éxito.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

  
}
