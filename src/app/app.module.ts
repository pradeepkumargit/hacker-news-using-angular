import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { NewsHomeComponent } from './news-home/news-home.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { TimeLineChartComponent } from './time-line-chart/time-line-chart.component';

import { HackerNewsService } from './service/hacker-news.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NewsHomeComponent,
    TimeLineChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule,
    TableModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
