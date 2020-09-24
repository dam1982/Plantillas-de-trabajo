import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryReturn } from 'src/app/model/query-return';
import { QueryReturnBusinessService } from 'src/app/business/queries/query-return-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { Field } from 'src/app/model/dynamicForms/field';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-query-return',
  templateUrl: './query-return.component.html',
  styleUrls: ['./query-return.component.scss']
})
export class QueryReturnComponent implements OnInit, AfterViewInit  {
  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;

  gridMapper: GridMapper<QueryReturn>;
  onActionSearch: boolean = false;

  
  constructor(private business : QueryReturnBusinessService,private toast: ToastService,private datePipe: DatePipe) {
    this.gridMapper = new GridMapper();

   }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'ReturnNumber', minWidth: 100, name: "#Devolución" },
      { prop: "OrderNumber", minWidth: 100, name: "Nro. Orden" },
      { prop: "ProductName", minWidth: 200, name: "Producto", canAutoResize: true },
      { prop: "CustomerName",  minWidth: 200,name: "Cliente", canAutoResize: true },      
      { prop: "StateName",minWidth: 100, name: "Estado" },      

      { prop: "PackageNumber",minWidth: 100, name: "#Paquete" },      
      { prop: "ModificationDate",minWidth: 200, name: "Modificado", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") } },      
      
      { prop: "LogisticsReturnDate",minWidth: 200, name: "Devuelto en", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") } },      
      { prop: "LogisticsReturnUser",minWidth: 200, name: "Devuelto por" },      
      { prop: "LogisticsReturnObs",minWidth: 200, name: "Obs. Devolución" },  

      { prop: "ProductionConfirmationDate",minWidth: 200, name: "Confirmado Producción en" , pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") }},      
      { prop: "ProductionConfirmationUser",minWidth: 200, name: "Confirmado Producción por" },      
      { prop: "ProductionConfirmationObs",minWidth: 200, name: "Obs. Confirmación" }, 

      { prop: "ProductionReturnDate",minWidth: 200, name: "Devolución Producción en", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") } },      
      { prop: "ProductionReturnUser",minWidth: 200, name: "Devolución Producción por" },      
      { prop: "ProductionReturnObs",minWidth: 200, name: "Obs. Devolución Producción" }, 

      { prop: "LogisticsConfirmationDate",minWidth: 200, name: "Confirmado Logística en", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") } },      
      { prop: "LogisticsConfirmationUser",minWidth: 200, name: "Confirmado Logística por" },      
      { prop: "LogisticsConfirmationObs",minWidth: 200, name: "Obs. Confirmado Logística" },       
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
      "Title": "Nro. Devolución",
      "FieldName": "ReturnNumber",
      "FieldType": 1,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 2
    }, 
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
          "filters": { "Code": "", "Name": "" }
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "QueryReturn",
        "Action": "GetStates",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Estado",
      "FieldName": "StateId",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 5,
      "MaxValue": 0,
      "Format": null,
      "Width": 3
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro. Paquete",
      "FieldName": "PackageNumber",
      "FieldType": 1,
      "CustomType": "number",
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": null,
      "Format": null,
      "Width": 2
    }, 
    
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro. Orden",
      "FieldName": "OrderNumber",
      "FieldType": 0,
      "CustomType": "text",
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": null,
      "Width": 2
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
        "Module": "QueryReturn",
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
        "Module": "QueryReturn",
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
    
    
    
  ];

  GetQuery(filters: any)
  {
    this.onActionSearch = true;
    this.business.GetReturns(filters).then(x => {
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
      this.gridMapper.ExportExcelAllColums("ConsultaDevoluciones");
      this.toast.AddToast("Información", "Exportación realizada con éxito.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }

}
