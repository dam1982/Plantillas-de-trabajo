import { Component, OnInit } from '@angular/core';
import {ChartDB} from '../../../../fack-db/chart-data';

@Component({
  selector: 'app-hd-dashboard',
  templateUrl: './hd-dashboard.component.html',
  styleUrls: ['./hd-dashboard.component.scss']
})
export class HdDashboardComponent implements OnInit {
  public chartDB: any;

  constructor() {
    this.chartDB = ChartDB;
  }

  ngOnInit() {
  }

}
