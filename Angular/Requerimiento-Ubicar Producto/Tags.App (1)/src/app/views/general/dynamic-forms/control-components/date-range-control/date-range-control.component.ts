import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/model/dynamicForms/field';

@Component({
  selector: 'app-date-range-control',
  templateUrl: './date-range-control.component.html',
  styleUrls: ['./date-range-control.component.scss']
})
export class DateRangeControlComponent implements OnInit {

  @Input()
  definition: Field;
  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  OnDateMinChange(event) {
    this.form.get(this.definition.FieldName + "Max").setValue(this.form.get(this.definition.FieldName + "Min").value);
  }

  OnDateMaxChange(event) {
    if (event.target.value < this.form.get(this.definition.FieldName + "Min").value)
      this.form.get(this.definition.FieldName + "Max").setValue(this.form.get(this.definition.FieldName + "Min").value);
  }
}
