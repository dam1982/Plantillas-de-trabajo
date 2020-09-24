import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/model/dynamicForms/field';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss']
})
export class TextControlComponent implements OnInit {

  @Input()
  definition: Field;
  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
