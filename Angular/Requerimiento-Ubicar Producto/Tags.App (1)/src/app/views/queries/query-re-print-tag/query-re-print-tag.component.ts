import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { QueryRePrintTag } from 'src/app/model/query-re-print-tag';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { GridMapper } from 'src/app/model/grid-mapper';
import { QueryRePrintTagBusinessService } from 'src/app/business/queries/query-re-print-tag-business.service';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { Field } from 'src/app/model/dynamicForms/field';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-query-re-print-tag',
  templateUrl: './query-re-print-tag.component.html',
  styleUrls: ['./query-re-print-tag.component.scss']
})
export class QueryRePrintTagComponent implements OnInit, AfterViewInit {
  @ViewChild('DynamicForm', { static: false }) DynamicForm: DynamicFormHostComponent;
  @ViewChild('jsonTemplate', { static: true }) jsonTemplate: TemplateRef<any>; 

  gridMapper: GridMapper<QueryRePrintTag>;
  onActionSearch: boolean = false;

  constructor(private business : QueryRePrintTagBusinessService,private toast: ToastService, private datePipe: DatePipe) {
    this.gridMapper = new GridMapper();

   }

  ngOnInit() {
    this.gridMapper.Columns = [
      { prop: 'TagTypeName', minWidth: 100, name: "Tipo Etiqueta" },
      { prop: "TagNumber", minWidth: 80, name: "#Etiqueta" },
      { prop: 'OrderNumber', minWidth: 100, name: "Nro. Orden" },
      { prop: "CustomerName",minWidth:200, name: "Cliente", canAutoResize: true },   
      { prop: "ProductName", minWidth:200, name: "Producto", canAutoResize: true },
      { prop: "ReprintDate",  minWidth:200, name: "Fecha Reimpresión", pipe: { transform: (value) => this.datePipe.transform(value, "yyyy-MM-dd HH:mm") }},
      { prop: 'ReprintUserName',minWidth:200,  name: "Usuario Reimpresión" },
      { prop: "PreviousTagObject", minWidth:350, name: "Etiqueta Anterior",cellTemplate: this.jsonTemplate  },      
    ];

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.DynamicForm.LoadComponent(this.formFilterFields);
    });
  }

  formFilterFields: Field[] = [
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
        "Module": "QueryRePrintTag",
        "Action": "GetTagTypes",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Tipo Etiqueta",
      "FieldName": "TagTypeId",
      "FieldType": 3,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 5,
      "MaxValue": 0,
      "Format": null,
      "Width": 4
    },
    {
      "IdField": null,
      "DisplayField": null,
      "DataService": null,
      "Title": "Nro. Etiqueta",
      "FieldName": "TagNumber",
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
      "Title": "Fecha Reimpresión",
      "FieldName": "ReprintDate",
      "FieldType": 8,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": null,
      "MaxValue": null,
      "Format": "yyyy-MM-dd",
      "Width": 6
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
        "Module": "QueryRePrintTag",
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
        "Module": "QueryRePrintTag",
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
    this.business.GetReprintTags(filters).then(x => {
      

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
      this.gridMapper.ExportExcelAllColums("ConsultaReimpresiones");
      this.toast.AddToast("Información", "Exportación realizada con éxito.", 10, ToastyType.success, true);
    } catch (error) {
      this.toast.AddToast("Error", error, 10, ToastyType.error, true);
    }
  }


}
