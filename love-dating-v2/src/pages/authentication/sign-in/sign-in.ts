/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of SignIn Page
 * File path - '../../../../src/pages/authentication/sign-in/sign-in'
 */


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Storage } from '@ionic/storage';

import { User } from '../../../models/user';

import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  page_url: any = 'SignInPage';
  itemModel:any;
  storagee: Storage;
  Errors :any="";

  dbRef: any;
  geoFire: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public db: AngularFireDatabase,storage: Storage, private geolocation: Geolocation) { 
      this.storagee=storage;
      

    }

  /**
   * --------------------------------------------------------------
   * Go To Profile Page
   * --------------------------------------------------------------
   * @method    goToProfile
   */
  goToProfile(x,y) {
    console.log(x+" "+y);
  try{ 
    this.dbRef = this.db.list('/user_location');
    this.geoFire = new GeoFire(this.dbRef.query.ref);

    this.db.list('/Users').query.ref.orderByChild("Username").equalTo(x).on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
  
        // "ada"
  
       if( childSnapshot.val().Password===y)
  
            {
              this.geolocation.getCurrentPosition().then((resp) => {
                this.setLocation(childSnapshot.val().Username, [resp.coords.latitude,resp.coords.longitude])
                }).catch((error) => {
                  console.log('Error getting location', error);
                });

              
  
    this.itemModel = new User(childSnapshot.val().Username,childSnapshot.val().Email,childSnapshot.val().Birthday,childSnapshot.val().Age,childSnapshot.val().About,childSnapshot.val().JobTitle,childSnapshot.val().Company,childSnapshot.val().School,childSnapshot.val().Gender,childSnapshot.val().Images,childSnapshot.val().GenderInterest,childSnapshot.val().HoopPlus);
              let store = {ageRange:[0,100],
                            rangeSearch:1}
              this.page_url='HomePage';
               this.storagee.set('name', this.itemModel);
               this.storagee.set('store',store);
                   this.navCtrl.setRoot(this.page_url);
  
            }
  
        // Cancel enumeration
    });}
  );
    
  
  }
  catch
    {
          if(typeof( x ) == "undefined") this.Errors=this.Errors+"Fill Your Username ";
        if(typeof( y ) == "undefined") this.Errors=this.Errors+"Fill Your Password ";
    }

  
  }

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
   * Go To Landing Page
   * --------------------------------------------------------------
   * @method    goToLandingPage
   */
  goToLandingPage() {
    this.navCtrl.setRoot('LandingPage');
  }

  private setLocation(key:string, coords: Array<number>) {
    this.geoFire.set(key, coords)
        .then(_ => console.log('location updated'))
        .catch(err => console.log(err))
  }
}
