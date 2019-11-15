/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Home Page
 * File path - '../../../../src/pages/home/home'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab1: any;
  tab2: any;
  tab3: any;

  Hoop_plus = 'false';
  profile_info :User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage, 
    public db: AngularFireDatabase) {
    this.tab1 = 'ProfilePage';
    this.tab2 = 'SwipePage';
    this.tab3 = 'MatchesPage';
  }

  /** Do any initialization */
  ngOnInit() {
    this.storage.get('name').then((val)=>{
      this.profile_info = val;
      this.db.object('/Users/'+this.profile_info.Name).valueChanges().subscribe((action:any)=>{
        this.Hoop_plus = action.HoopPlus;
      })
      
      
    });
    
    
  }       
}

