import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartDB} from '../../../fack-db/chart-data';
import {ApexChartService} from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';

declare var $: any;
import 'peity';

@Component({
  selector: 'app-widget-chart',
  templateUrl: './widget-chart.component.html',
  styleUrls: ['./widget-chart.component.scss']
})
export class WidgetChartComponent implements OnInit, OnDestroy {
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public taskRate: number;

  public lastDate: number;
  public siteVisitorCAC: any;
  public data: any;

  public intervalSub: any;
  public intervalMain: any;

  constructor(public apexEvent: ApexChartService) {
    this.chartDB = ChartDB;
    this.dailyVisitorStatus = '1y';
    this.taskRate = 10;

    this.lastDate = 0;
    this.data = [];

    this.getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {min: 10, max: 90});
    this.siteVisitorCAC = {
      chart: {
        height: 300,
        type: 'area',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 2000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [{
        name: 'active Users :',
        data: this.data
      }],
      colors: ['#ff5252'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: 777600000,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    };
  }

  ngOnInit() {
    setTimeout(() => {
      $('.data-attributes').peity('donut');

      $('span.pie_1').peity('pie', {
        fill: ['#4680ff', '#eff3f6']
      });
      $('span.pie_2').peity('pie', {
        fill: ['#eff3f6', '#4680ff']
      });
      $('span.pie_3').peity('pie', {
        fill: ['#eff3f6', '#4680ff']
      });
    });

    this.intervalSub = setInterval(() => {
      this.getNewSeries(this.lastDate, {min: 10, max: 90});
      this.apexEvent.eventChangeSeriesData();
    }, 2000);

    this.intervalMain = setInterval(() => {
      this.resetData();
      this.apexEvent.eventChangeSeriesData();
    }, 60000);

  }

  ngOnDestroy() {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
    if (this.intervalMain) {
      clearInterval(this.intervalMain);
    }
  }

  dailyVisitorEvent(status) {
    this.dailyVisitorStatus = status;
    switch (status) {
      case '1m':
        this.dailyVisitorAxis = {
          min: new Date('28 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        };
        break;
      case '6m':
        this.dailyVisitorAxis = {
          min: new Date('27 Sep 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case '1y':
        this.dailyVisitorAxis = {
          min: new Date('27 Feb 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'ytd':
        this.dailyVisitorAxis = {
          min: new Date('01 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'all':
        this.dailyVisitorAxis = {
          min: undefined,
          max: undefined
        };
        break;
    }

    setTimeout(() => {
      this.apexEvent.eventChangeTimeRange();
    });
  }

  getDayWiseTimeSeries(baseval, count, yrange) {
    let i = 0;
    while (i < count) {
      const x = baseval;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      this.data.push({x, y});
      this.lastDate = baseval;
      baseval += 86400000;
      i++;
    }
  }

  resetData() {
    this.data = this.data.slice(this.data.length - 10, this.data.length);
  }

  getNewSeries(baseval, yrange) {
    const newDate = baseval + 86400000;
    this.lastDate = newDate;
    this.data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
  }

}
