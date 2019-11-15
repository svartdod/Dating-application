/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of settings
 * File path - '../../../../src/pages/settings/settings'
 */


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  women: Boolean = true;
  man: Boolean = true;
  distance: any = 1
  ages: any;
  visibility: Boolean = true;
  profile_data:User;
  store:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,public storage: Storage,public db:AngularFireDatabase) {

    storage.get('name').then((val:User) => {
  this.profile_data=val;

  
  });
  storage.get('store').then((val) => {this.store=val;console.log(this.store)});
  
  
  }

  ngAfterViewInit(): void {
    
    this.ages = { lower: 18, upper: 25 };
  }

  // Logout
  logout() {
    
    this.storage.remove('name');

    this.navCtrl.setRoot('LandingPage');
  }
  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    console.log(this.profile_data.Name);
    this.store = {
      'ageRange':[this.ages.lower,this.ages.upper],
      'rangeSearch': this.distance
    }
    this.storage.set('store',this.store);
    if (this.man && this.women) {
      this.db.list("/Users/"+this.profile_data.Name).query.ref.update({GenderInterest:"ALL"});
      this.profile_data.genderInterest="ALL"
    }else if(this.man){
      this.db.list("/Users/"+this.profile_data.Name).query.ref.update({GenderInterest:"Male"});
      this.profile_data.genderInterest="Male"
    }else{
      this.db.list("/Users/"+this.profile_data.Name).query.ref.update({GenderInterest:"Female"});
      this.profile_data.genderInterest="Female"
    }
    this.storage.set('name',this.profile_data)
    this.viewCtrl.dismiss();
  }

  change(){
  }
  block()
  {
    console.log(this.profile_data.Name);
    this.db.list("Users/"+this.profile_data.Name).query.ref.update({Etat:"DISABLE"});
    this.logout()
    // this.navCtrl.setRoot("LandingPage");
  



  }

}
