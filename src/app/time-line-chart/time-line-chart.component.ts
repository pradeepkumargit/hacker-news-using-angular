import { Component, OnInit, Input } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HackerNewsService } from '../service/hacker-news.service';

@Component({
  selector: 'app-time-line-chart',
  templateUrl: './time-line-chart.component.html',
  styleUrls: ['./time-line-chart.component.css']
})
export class TimeLineChartComponent implements OnInit {

  newsList: any[] = [];
  
  // for Votes
  newsPoints: any[];
  newsVotes: any;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];

  // for Ids
  newIds: any[];
  ids: any;

  constructor(private hackerNewsService:HackerNewsService) { }

  ngOnInit() {
    this.loadAndRenderLineChart();
    this.hackerNewsService.newsUpVoteCount$.subscribe(newsList => {
      this.newsList = newsList;
      this.loadAndRenderLineChart();
    });    
  }

  loadAndRenderLineChart() {

    // get the news from hackers news service
    this.newsList = this.hackerNewsService.getNewsList();
   
    // to create the prototype of map
    const mapA = Array.prototype.map;

    // for Votes start
    this.newsPoints = this.newsList.map(vote => vote.points)
    this.newsVotes = mapA.call(this.newsPoints, eachVote => {
      return eachVote;
    })
    
    // Array of different segments in chart
    this.lineChartData = [
      {
        data: this.newsVotes,
        label: 'Vote'
      },
    ];
    // console.log('lineChartData Y-Axis', this.lineChartData)
    // for Votes ends

    this.newIds = this.newsList.map(id => id.objectID);

    //Labels shown on the x-axis
    this.ids = mapA.call(this.newIds, eachNewsId => {
      return `${eachNewsId}`;
    })

    this.lineChartLabels = this.ids;
    //console.log('lineChartLabels X-Axis', this.lineChartLabels)
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
