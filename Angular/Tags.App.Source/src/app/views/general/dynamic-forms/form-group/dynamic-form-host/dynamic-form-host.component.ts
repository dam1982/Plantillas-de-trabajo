import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, TemplateRef, Input, AfterViewInit } from '@angular/core';
import { GridMapper } from 'src/app/model/grid-mapper';
import { ToastService, ToastyType } from 'src/app/theme/shared/components/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

import { DynamicFormBusinessService } from 'src/app/business/general/dynamic-form-business.service'
import { FieldTypes } from 'src/app/model/dynamicForms/field-types';
import { SwitchControlComponent } from '../../control-components/switch-control/switch-control.component';
import { SelectListControlComponent } from '../../control-components/select-list-control/select-list-control.component';
import { DateRangeControlComponent } from '../../control-components/date-range-control/date-range-control.component';
import { TextControlComponent } from '../../control-components/text-control/text-control.component';
import { Field } from 'src/app/model/dynamicForms/field';
import { CalendarControlComponent } from '../../control-components/calendar-control/calendar-control.component';

@Component({
  selector: 'app-dynamic-form-host',
  templateUrl: './dynamic-form-host.component.html',
  styleUrls: ['./dynamic-form-host.component.scss']
})
export class DynamicFormHostComponent implements OnInit {

  @ViewChild("filterhost", { static: true, read: ViewContainerRef }) filterhost: ViewContainerRef;
  @ViewChild('switchTemplate', { static: true }) switchTemplate: TemplateRef<any>;

  @Input() FormFields: Field[];
  @Input() ValidateData: boolean = true;
  FormGroup: FormGroup = new FormGroup({ empty: new FormControl() });
  onActiveSearch: boolean = false;


  jsonData: any = {};

  constructor(private business: DynamicFormBusinessService, private resolver: ComponentFactoryResolver, private toast: ToastService, private route: ActivatedRoute, private datePipe: DatePipe) {

  }

  ngOnInit() {


  }

  LoadComponent(formFields: Field[]) {
    this.FormFields = formFields;
    this.BuildFormGroup();
    this.BuildControls();
    this.FormGroup.valueChanges.subscribe(x => {
      this.jsonData = x;
    });
  }

  GetFormData() {
    this.FormGroup.markAllAsTouched();
    if (this.FormGroup.invalid) {
      this.toast.AddToast("Error", "Fomulario invalido", 10, ToastyType.error, true);
      throw "Fomulario invalido. Existen datos sin diligenciar.";
    }

    for (const key in this.jsonData) {
      if (this.jsonData[key] == undefined || this.jsonData[key] == "")
        delete (this.jsonData[key]);
    }

    for (let prop in this.jsonData) {
      if (prop)
        return this.jsonData;
    }

    if (this.ValidateData)
      throw "Debe indicar al menos un filtro para la búsqueda.";

    return new Object();
  }

  BuildFormGroup() {
    let group: any = {};
    this.FormFields.forEach(f => {
      switch (f.FieldType) {
        case FieldTypes.DateRange:
          group[f.FieldName + "Min"] = new FormControl(f.DefaultValue);
          group[f.FieldName + "Max"] = new FormControl(f.DefaultValue);
          break;
        case FieldTypes.TextBox:
        case FieldTypes.NumericBox:
          group[f.FieldName] = new FormControl(f.DefaultValue, { updateOn: 'blur' });
          break;
        default:
          group[f.FieldName] = new FormControl(f.DefaultValue);
          break;
      }
    });
    this.FormGroup = new FormGroup(group);
  }


  BuildControls() {
    this.filterhost.clear();
    this.FormFields.forEach(f => {
      var componentRef: any;
      switch (f.FieldType) {
        case FieldTypes.Calendar:
          componentRef = this.filterhost.createComponent(this.resolver.resolveComponentFactory(CalendarControlComponent));
          break;
        case FieldTypes.Switch:
          componentRef = this.filterhost.createComponent(this.resolver.resolveComponentFactory(SwitchControlComponent));
          break;
        case FieldTypes.ComboBox:
        case FieldTypes.ComboBoxCascade:
        case FieldTypes.AutoComplete:
          componentRef = this.filterhost.createComponent(this.resolver.resolveComponentFactory(SelectListControlComponent));
          break;
        case FieldTypes.DateRange:
          componentRef = this.filterhost.createComponent(this.resolver.resolveComponentFactory(DateRangeControlComponent));
          break;
        default:
          componentRef = this.filterhost.createComponent(this.resolver.resolveComponentFactory(TextControlComponent));
          break;
      }
      componentRef.instance.definition = f;
      componentRef.instance.form = this.FormGroup;
    });
  }

  BuildControlsValues() {
    var filters: any[] = [];
    this.FormFields.forEach(x => {

      switch (x.FieldType) {
        case FieldTypes.DateRange:
          if (this.FormGroup.get(x.FieldName + "Min").value != null || this.FormGroup.get(x.FieldName + "Max").value != null) {
            let filter: Field = new Field();
            filter.FieldName = x.FieldName
            filter.FieldType = x.FieldType
            filter.IdField = x.IdField
            filter.MinValue = this.FormGroup.get(x.FieldName + "Min").value != null ? this.FormGroup.get(x.FieldName + "Min").value : null;
            filter.MaxValue = this.FormGroup.get(x.FieldName + "Max").value != null ? this.FormGroup.get(x.FieldName + "Max").value : null;
            filters.push(filter);
          }
          break;
        default:
          if (this.FormGroup.get(x.FieldName).value == null)
            return;
          filters.push(new Field(x.FieldName, x.FieldType, x.IdField, this.FormGroup.get(x.FieldName).value));
          break;
      }
    });
    return filters;
  }
  CleanForm() {
    this.FormGroup.reset();
    this.jsonData = {};
  }
}