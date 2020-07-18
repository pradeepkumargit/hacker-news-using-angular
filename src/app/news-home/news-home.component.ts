import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HackerNewsService } from '../service/hacker-news.service';
import { News } from './news';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.css']
})
export class NewsHomeComponent implements OnInit {

  news: News[];

  first = 0;

  rows = 15;

  constructor(private router: Router,
              private hackerNewsService:HackerNewsService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.hackerNewsService.getNewsData().subscribe(
      response => {
        this.news = response['hits'];
        console.log(this.news)
      }
    )
  }

}
