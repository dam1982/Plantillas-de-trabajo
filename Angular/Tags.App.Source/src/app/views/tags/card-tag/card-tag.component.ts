import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-tag',
  templateUrl: './card-tag.component.html',
  styleUrls: ['./card-tag.component.scss']
})
export class CardTagComponent implements OnInit {

  @Input() dataTag: any;

  constructor() { }

  ngOnInit() {
  }

}
