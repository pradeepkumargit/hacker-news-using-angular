import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  newsId:number;
  newsList:any[];
  newsFrontPageAPI = 'https://hn.algolia.com/api/v1/search?tags=front_page'
  newsDetailPageAPI = 'https://hn.algolia.com/api/v1/items?id='

  constructor(private httpClient:HttpClient,) { }

  getNewsData() {
    return this.httpClient.get(this.newsFrontPageAPI);
  }

  getNewsDetailData() {
    let fullUrl = this.newsDetailPageAPI + this.newsId
    console.log('full url',fullUrl);
    return this.httpClient.get(fullUrl);
  }

  setNewsId(id) {
    this.newsId = id;
  }

  getNewsId() {
    return this.newsId;
  }

  setNewsList(newsList) {
    this.newsList = newsList;
  }

  getNewsList() {
    return this.newsList
  }
}
