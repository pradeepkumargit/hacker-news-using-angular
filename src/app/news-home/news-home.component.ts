import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'
import { HackerNewsService } from '../service/hacker-news.service';
import { News } from './news';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.css']
})
export class NewsHomeComponent implements OnInit, OnDestroy {

  subscription:Subscription;

  news: News[];
  // pagination variable
  first = 0;
  rows = 10;

  isNewsLoaded:any;
  showNewsForChart:boolean = false;

  constructor(private router: Router,
              private hackerNewsService:HackerNewsService) { }
  
  ngOnInit() {
    this.loadNews();
  }

  /**
   * Method to get the news list 
   */
  loadNews() {
    // get the news from API only first timem otherwise get from localstorage for state management
    this.isNewsLoaded = localStorage.getItem('isNewsLoaded');
    if (this.isNewsLoaded) {
      this.news = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
      if (this.news && this.news.length > 0) {
        this.hackerNewsService.setNewsList(this.news);
        this.showNewsForChart = true;
      }
    } else {
      this.subscription = this.hackerNewsService.getNewsData().subscribe(
        response => {
          this.news = response['hits'];
          if (this.news && this.news.length > 0) {
            this.hackerNewsService.setNewsList(this.news);
            this.showNewsForChart = true;
          }
          console.log(this.news)
        }
      )
    }
  }

 /**
  * Method to hide news item once click on hide 
  * @param news 
  */
  hideNewsItem(news) {
    let newsTobeHidden = news;
    this.news = this.news.filter(item => item !== newsTobeHidden);
    this.isNewsLoaded = true;
    localStorage.setItem('items', JSON.stringify(this.news));
    localStorage.setItem('isNewsLoaded', JSON.stringify(this.isNewsLoaded));    
  }

  /**
   * Method to increase the upvote count on click on upvote icon
   * @param news 
   */
  addUpVote(news) {    
    // logic to updat the upvote count
    let updatedPoint =  news.points + 1;
    let currentNews = this.news.filter(item => item.objectID == news.objectID);    
    currentNews[0].points = updatedPoint;
    
    // logic to update the line chart on real time based on the upvote count
    this.hackerNewsService.updateUpVoteCountInChart(this.news);
    if (this.news && this.news.length > 0) {
      this.hackerNewsService.setNewsList(this.news);
    }

    // logic to set the news state for state management in application
    localStorage.setItem('items', JSON.stringify(this.news));
    localStorage.setItem('isNewsLoaded', JSON.stringify(this.isNewsLoaded));    
  }

  /**
   * Pagination method for table
   * @param event 
   */
  paginate(event) {
    console.log('first page',event.first);
    console.log('row page',event.rows);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
