import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { FormGroup } from '@angular/forms';
import { FieldTypes } from 'src/app/model/dynamicForms/field-types';
import { DynamicFormBusinessService } from 'src/app/business/general/dynamic-form-business.service';
import { Field } from 'src/app/model/dynamicForms/field';


@Component({
  selector: 'app-select-list-control',
  templateUrl: './select-list-control.component.html',
  styleUrls: ['./select-list-control.component.scss']
})
export class SelectListControlComponent implements OnInit {

  @Input()
  definition: Field = new Field();
  @Input()
  form: FormGroup;
  dataList: [];
  relatedField: string;
  tickControl:any=0;
  @ViewChild("select", { static: false }) Select: any;

  constructor(private business: DynamicFormBusinessService) {//StaticReportBusinessService

  }

  ngOnInit() {
    if (this.definition.FieldType == FieldTypes.ComboBox) {
      this.GetFilterData();
    }
    else if (this.definition.FieldType == FieldTypes.ComboBoxCascade) 
    {
      if (!this.definition.DataService.Data)
        throw new Error("Invalid ComboBoxCascade configuration.");
      this.relatedField = this.definition.DataService.Data[Object.keys(this.definition.DataService.Data)[0]];
      this.form.get(this.relatedField).valueChanges.subscribe(x => 
      {
        this.form.get(this.definition.FieldName).setValue(null);
        this.dataList = [];
        if (!x)
          return;
        this.definition.DataService.Data[Object.keys(this.definition.DataService.Data)[0]] = x;
        this.GetFilterData();
      });
    }
  }


  AutoCompleteField() {
    if (this.definition.FieldType == FieldTypes.AutoComplete) {
      if (!this.definition.DataService)
        throw new Error("Invalid AutoComplete configuration.");
      let key = Object.keys(this.definition.DataService.Data)[0];
      let valueSearch = this.Select.searchTerm;

      if (valueSearch.length >= this.definition.MinValue) {
        if (key == "filters") {
          for (let prop of Object.keys(this.definition.DataService.Data.filters)) {
            this.definition.DataService.Data.filters[prop] = valueSearch;
          }
        }
        this.GetFilterData();
      }
    }
  }


  GetFilterData() {
    this.business.GetData(this.definition.DataService).then(x => {
      this.dataList = x;
    }).catch(x => {
      Swal.fire("Error", "" + x, 'error');
    });
  }

}
