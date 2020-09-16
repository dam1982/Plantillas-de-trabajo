import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/model/dynamicForms/field';

@Component({
  selector: 'app-switch-control',
  templateUrl: './switch-control.component.html',
  styleUrls: ['./switch-control.component.scss']
})
export class SwitchControlComponent implements OnInit {
  @Input()
  definition: Field;
  @Input()
  form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
