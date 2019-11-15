/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of user details Page
 * File path - '../../../../src/pages/user-details/user-details'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  userInfo: User;
  image:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController) {
    // Get user information
    this.userInfo = this.navParams.get('user');
    this.image = "https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+this.userInfo.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb"
  }

  /**
   * --------------------------------------------------------------
   * Actions
   * --------------------------------------------------------------
   * @method    actions
   */
  actions(myEvent) {
    let popover = this.popoverCtrl.create(UserProfilePopover);
    popover.present({
      ev: myEvent
    });
  }

  /**
   * --------------------------------------------------------------
   * Dismiss
   * --------------------------------------------------------------
   * @method    dismiss   Back to Home Page
   */
  dismiss() {
    // this.navCtrl.setRoot('HomePage');
    this.viewCtrl.dismiss();
    
  }
}

// Component of UserProfilePopover
@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Recommend</button>
      <button ion-item (click)="close()">Report</button>
      <button ion-item (click)="close()">Block</button>
    </ion-list>
  `
})
export class UserProfilePopover {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}