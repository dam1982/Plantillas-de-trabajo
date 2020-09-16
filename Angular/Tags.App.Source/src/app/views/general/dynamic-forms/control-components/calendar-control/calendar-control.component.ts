import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/model/dynamicForms/field';

@Component({
  selector: 'app-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: ['./calendar-control.component.scss']
})
export class CalendarControlComponent implements OnInit {

  @Input()
  definition: Field;
  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  OnDateMinChange(event) {
    this.form.get(this.definition.FieldName).setValue(this.form.get(this.definition.FieldName).value);
  }

  OnDateChange(event)
  {
    
  }

}
