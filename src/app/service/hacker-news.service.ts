import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  newsURL = 'https://hn.algolia.com/api/v1/search?tags=front_page'

  constructor(private httpClient:HttpClient,) { }

  getNewsData() {
    return this.httpClient.get(this.newsURL)
  }

}
