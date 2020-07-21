import { Component, OnInit, Input } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-time-line-chart',
  templateUrl: './time-line-chart.component.html',
  styleUrls: ['./time-line-chart.component.css']
})
export class TimeLineChartComponent implements OnInit {

  @Input() news: any[] = [];

  // for Votes
  newsPoints: any[];
  newsVotes: any;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];

  // for Ids
  newIds: any[];
  ids: any;

  constructor() { }

  ngOnInit() {
    this.loadAndRenderLineChart();
  }

  loadAndRenderLineChart() {
    console.log('new for charts',this.news)
    let newslist =  this.news;
    const mapA = Array.prototype.map;

    // for Votes start
    this.newsPoints = newslist.map(vote => vote.points)
    this.newsVotes = mapA.call(this.newsPoints, eachVote => {
      return eachVote;
    })
    console.log('newsVotes', this.newsVotes);

    // Array of different segments in chart
    this.lineChartData = [
      {
        data: this.newsVotes,
        label: 'Vote'
      },
    ];
    console.log('lineChartData', this.lineChartData)
    // for Votes ends

    this.newIds = newslist.map(id => id.objectID);
    console.log('newsIDs',this.newIds);
    
    //Labels shown on the x-axis
    this.ids = mapA.call(this.newIds, eachNewsId => {
      return `${eachNewsId}`;
    })

    this.lineChartLabels = this.ids;
    console.log('lineChartLabels', this.lineChartLabels)
  }

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: '#2b6da0',
    }
  ];

  // Set true to show legends
  lineChartLegend = false;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
