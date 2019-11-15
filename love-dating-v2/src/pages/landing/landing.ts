/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Landing Page
 * File path - '../../../../src/pages/landing/landing'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../models/user';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  language :any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public translate: TranslateService) { 
      
    }


  ngOnInit() {
    this.storage.get('name').then((val)=>{
      console.log(val)
      if (val != null) {
        this.navCtrl.setRoot('HomePage');
      }
    })
    this.storage.get('lang').then((val)=>{
      console.log(val)
      if (val != null) {
        this.translate.use(val);
        this.language = this.translate.currentLang;
      }
    })
  }

  onChange(e) {
    this.translate.use(e);
    this.storage.set('lang',e)
    console.log(e)}
  /**
   * --------------------------------------------------------------
   * Go To Sign Up Page
   * --------------------------------------------------------------
   * @method    goToSignUpPage
   */
  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }

  /**
   * --------------------------------------------------------------
   * Go To Sign In Page
   * --------------------------------------------------------------
   * @method    goToSignInPage
   */
  goToSignInPage() {
    this.navCtrl.setRoot('SignInPage');
  }
}
