/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of SignUp Page
 * File path - '../../../../src/pages/authentication/sign-up/sign-up'
 */


import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl ,ValidatorFn,AbstractControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';
import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @ViewChild(Slides) slides: Slides;
  gender: any = 'Female';

  dbRef: any;
  geoFire: any;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'date':[
      { type: 'required', message: 'Date is required.' }
    ],
    'password':[
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
      { type: 'required', message: 'Password is required.' }
    ],
    'confirmPassword':[
      { type: 'minlength', message: 'confirmPassword must be at least 5 characters long.' },
      { type: 'maxlength', message: 'confirmPassword cannot be more than 25 characters long.' },
      { type: 'required', message: 'confirmPassword is required.' },
      { type: 'equalto', message: 'Password and Confirm password must be same.' },
    ]
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,public db: AngularFireDatabase,private geolocation: Geolocation,public formBuilder: FormBuilder) {

      
      

  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required,
      ]))
      
    });

    this.matching_passwords_group = this.formBuilder.group({
      password:  new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      confirmPassword:new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required,
        this.equalto('password')
      ])),
    }); 
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    if(!isValid){
    return { 'equalTo': {isValid} }
    }else{
    return null;
    }
    };
    }
  /**
   * --------------------------------------------------------------
   * Go To Profile Page
   * --------------------------------------------------------------
   * @method    goToProfile
   */
  goToProfile(Username,Password,Email,Birthday) {
    try{
        this.db.list('/Users').set(Username,{"Username":Username,"Password":Password,"Birthday":Birthday,"Email":Email,"Gender":this.gender,"Age":"","About":"","JobTitle": "",  "Company": "",  "School": "",  "Images": "13"
,"Etat":"ENABLE","GenderInterest":"ALL","HoopPlus":"false"}).then(()=>this.navCtrl.setRoot('SignInPage'));
        this.dbRef = this.db.list('/user_location');
        this.geoFire = new GeoFire(this.dbRef.query.ref);
        this.geolocation.getCurrentPosition().then((resp) => {
        this.setLocation(Username, [resp.coords.latitude,resp.coords.longitude])
        }).catch((error) => {
          console.log('Error getting location', error);
        });
        

        }
        catch (e)
{
  this.navCtrl.setRoot('SignUpPage');
// Code to handle exception
}
  

    //this.navCtrl.setRoot('SignInPage');
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

  /**
   * --------------------------------------------------------------
   * Go To Landing Page
   * --------------------------------------------------------------
   * @method    goToLandingPage
   */
  goToLandingPage() {
    this.navCtrl.setRoot('LandingPage');
  }

  /**
   * --------------------------------------------------------------
   * Go To Second Slider
   * --------------------------------------------------------------
   * @method    step2
   */
  step2() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  /**
   * --------------------------------------------------------------
   * Go To Third Slider
   * --------------------------------------------------------------
   * @method    step3
   */
  step3() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

step_zrax()
{
  this.gender="Male";
}
step_zina()
{
  this.gender="Female"
}

private setLocation(key:string, coords: Array<number>) {
  this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err))
}

}
