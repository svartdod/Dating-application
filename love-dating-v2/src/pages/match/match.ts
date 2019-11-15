/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Match
 * File path - '../../../../src/pages/match/match'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  userInfo: any;
  profile_data :User;
  images=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage) { }

  /** Do any initialization */
  ngOnInit() {
    // Get user information
    this.storage.get('name').then((val) => {
      this.profile_data=val;
      this.images.push("https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+this.profile_data.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb")
      });
    this.userInfo = this.navParams.get('user');
    this.images.push("https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+this.userInfo.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb")
    console.log(this.userInfo.Username)
  }

  /**
   * --------------------------------------------------------------
   * Open Chat Page
   * --------------------------------------------------------------
   * @method    goToChatPage
   */
  goToChatPage() {
    this.modalCtrl.create('ChatBoxPage',{ userReceiver: this.userInfo,userSender: this.profile_data }).present();
  }

  /**
   * --------------------------------------------------------------
   * Dismiss
   * --------------------------------------------------------------
   * @method    dismiss   Back to Home Page
   */
  dismiss() {
    this.navCtrl.setRoot('HomePage');
  }
}
