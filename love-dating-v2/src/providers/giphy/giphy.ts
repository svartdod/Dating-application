/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Giphy,
 * File path - '../../../src/providers/giphy/giphy'
 */


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { apiKey } from '../../assets/config/giphy';

@Injectable()
export class GiphyProvider {

  constructor(public http: HttpClient) { }

  /**
   * --------------------------------------------------------
   * Get Trending Gifs
   * --------------------------------------------------------
   */
  getTrendingGifs(limit) {
    const link = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=' + limit + '&rating=G';
    return Observable.create(observer => {
      this.http.get(link).subscribe((result: any) => {
        observer.next(result);
        observer.complete();
      });
    });
  }

  /**
   * --------------------------------------------------------
   * Search Gifs
   * --------------------------------------------------------
   */
  searchGif(text) {
    const link = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + text;
    return Observable.create(observer => {
      this.http.get(link).subscribe((result: any) => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}
