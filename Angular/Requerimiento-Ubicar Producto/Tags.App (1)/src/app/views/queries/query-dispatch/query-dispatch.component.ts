import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DynamicFormHostComponent } from '../../general/dynamic-forms/form-group/dynamic-form-host/dynamic-form-host.component';
import { Field } from 'src/app/model/dynamicForms/field';
import { DispatchReportBusinessService } from 'src/app/business/queries/dispatch-report-business.service';

@Component({
  selector: 'app-query-dispatch',
  templateUrl: './query-dispatch.component.html',
  styleUrls: ['./query-dispatch.component.scss']
})
export class QueryDispatchComponent implements OnInit, AfterViewInit {

  @ViewChild('DynamicForm', { static: false }) DynamicForm:   DynamicFormHostComponent;
  @ViewChild('pdfContainer', { static: false })
  pdfContainer: ElementRef;

  onActiveSearch:boolean = false;
  pdfSource:string=null;
  constructor(private business:DispatchReportBusinessService) { }

  ngOnInit() {
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
      "Title": "Nro Orden",
      "FieldName": "OrderNumber",
      "FieldType": 1,
      "CustomType": null,
      "Required": true,
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
      "Title": "Nro Alistamiento",
      "FieldName": "EnlistmentNumber",
      "FieldType": 1,
      "CustomType": null,
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
      "Title": "Rango Fechas Alistamiento",
      "FieldName": "EnlistmentDate",
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
      "IdField": "Code",
      "DisplayField": "Name",
      "DataService": {
        "Success": false,
        "Message": null,
        "SessionToken": null,
        "Data": {
          "OrderNumber": "OrderNumber" 
        },
        "User": null,
        "Service": "TagsLogic",
        "IpAddress": null,
        "Module": "DispatchReport",
        "Action": "GetProducts",
        "ApiKey": null,
        "Version": null,
      },
      "Title": "Producto",
      "FieldName": "ProductCode",
      "FieldType": 9,
      "CustomType": null,
      "Required": false,
      "DefaultValue": null,
      "MinValue": 0,
      "MaxValue": 0,
      "Format": null,
      "Width": 6
    },
  ];

  GeneratePdf()
  {
    this.pdfSource = null;
    setTimeout(() => {
      this.pdfSource = this.business.GetDispatchReport(this.DynamicForm.GetFormData());
    }, 500);

    this.onActiveSearch = true;
  }

  OnLoadPdf()
  {
    this.onActiveSearch = false;    
    this.pdfContainer.nativeElement.scrollIntoView();
  }

  Clear()
  {
    this.DynamicForm.CleanForm();
    this.onActiveSearch = false;
    this.pdfSource = null;
  }
}
