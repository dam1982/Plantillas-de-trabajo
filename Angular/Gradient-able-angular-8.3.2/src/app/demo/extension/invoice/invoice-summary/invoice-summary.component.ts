import { Component, OnInit } from '@angular/core';
import {ChartDB} from '../../../../fack-db/chart-data';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent implements OnInit {
  public chartDB: any;

  constructor() {
    this.chartDB = ChartDB;
  }

  ngOnInit() {
  }

}
