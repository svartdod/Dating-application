/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of data,
 * File path - '../../../src/providers/data/data'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) { }

  /**
   * --------------------------------------------------------
   * Get List of Users
   * --------------------------------------------------------
   */
  getUserList() {
    return Observable.create(observer => {
      return this.http.get('assets/data/data.json').subscribe((result: any) => {
        observer.next(result.Users);
        observer.complete();
      });
    });
  }

  /**
   * --------------------------------------------------------
   * Slider Data
   * --------------------------------------------------------
   */
  profileSlider() {
    return [
      {
        "title": "Get Hoop Gold",
        "details": "See who likes you & more!"
      },
      {
        "title": "Get Matches Faster",
        "details": "Limit what others see Hoop plus"
      },
      {
        "title": "Stand Out With Super Likes",
        "details": "You are 3x more likely to get a match"
      },
      {
        "title": "Swipe Around The World",
        "details": "Passport to anywhere with Hoop plus"
      },
      {
        "title": "Control Your Profile",
        "details": "Limit what others see Hoop plus"
      },
      {
        "title": "I Meant to Swipe Right",
        "details": "Get unlimited to Rewinds with Hoop plus"
      },
      {
        "title": "Increase Your Chances",
        "details": "Get unlimited likes with Hoop plus"
      }
    ]
  }
}
