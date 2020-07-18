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

  rows = 10;

  isNewsLoaded:any;
  constructor(private router: Router,
              private hackerNewsService:HackerNewsService) { 
                    
              }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.isNewsLoaded = localStorage.getItem('isNewsLoaded') ;
    console.log('Is news already loaded using services',this.isNewsLoaded);
    if(this.isNewsLoaded) {
      this.news =  localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
      console.log('after refresh how many news', this.news.length);
    } else {
        this.hackerNewsService.getNewsData().subscribe(
          response => {
            this.news = response['hits'];
            console.log(this.news)
          }
        )
    }
  }

  navigateToNewDetail(news) {
    console.log('what is the id',news.objectID);
    this.hackerNewsService.setNewsId(news.objectID);
    this.hackerNewsService.getNewsDetailData().subscribe(
      reponse => {
        if (reponse) {
          console.log('news deatils',reponse);
        }        
      },
      err => {
        console.log('Something went wrong',err);
      }
    )
  }

  hideNewsItem(news) {
    let newsTobeHidden = news;
    this.news = this.news.filter(item => item !== newsTobeHidden);
    this.isNewsLoaded = true;
    localStorage.setItem('items', JSON.stringify(this.news));
    localStorage.setItem('isNewsLoaded', JSON.stringify(this.isNewsLoaded));    
    console.log('news after click on Hide',this.news);
    console.log('new Length after click on hide',this.news.length);
  }

}
