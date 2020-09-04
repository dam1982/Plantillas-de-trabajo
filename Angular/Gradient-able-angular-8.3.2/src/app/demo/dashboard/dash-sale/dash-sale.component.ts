import { Component, OnInit } from '@angular/core';
import {ApexChartService} from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';
import {ChartDB} from '../../../fack-db/chart-data';

@Component({
  selector: 'app-dash-sale',
  templateUrl: './dash-sale.component.html',
  styleUrls: ['./dash-sale.component.scss']
})
export class DashSaleComponent implements OnInit {
  public chartDB: any;

  constructor(public apexEvent: ApexChartService) {
    this.chartDB = ChartDB;
  }

  ngOnInit() {
  }

}
