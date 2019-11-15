/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Profile
 * File path - '../../../../src/pages/profile/profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { AngularFireDatabase } from '@angular/fire/database';


import { Storage } from '@ionic/storage';
import { User } from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  sliderData: any;
  profile_data :User;
  Age : any ; 
  Image : any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public storage: Storage, 
    public db: AngularFireDatabase,
    public alertCtrl: AlertController) {
//    this.profile_data =  storage.get('Name');


  }

  /** Do any initialization */
  ngOnInit() {
    this.storage.get('name').then((val) => {
      this.profile_data=val;
      console.log(this.profile_data);
       let newDate = new Date(this.profile_data.Birthday);
        let today=new Date();
        let y= (Math.abs(today.getTime() - newDate.getTime()) / (31557600000));
           this.Age = Math.floor( y);
           this.db.list("Users/"+this.profile_data.Name).query.ref.update({Age: this.Age});
           this.Image="https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+this.profile_data.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb"
            console.log(this.Image);
    
      if(!this.profile_data){
            this.navCtrl.setRoot('LandingPage');
        }
    
    
      });
     
     this.storage.get('store').then((val)=>{
       console.log(val);
     })
    this.getSliderData();
  }

  /**
   * --------------------------------------------------------------
   * Slider Data
   * --------------------------------------------------------------
   * @method    getSliderData
   */
  getSliderData() {
    this.sliderData = this.dataProvider.profileSlider();
  }

  /**
   * --------------------------------------------------------------
   * Open Edit Profile Page
   * --------------------------------------------------------------
   * @method    openEditProfilePage
   */
  openEditProfilePage() {
    this.modalCtrl.create('EditProfilePage').present();
  }

  /**
   * --------------------------------------------------------------
   * Open Settings Page
   * --------------------------------------------------------------
   * @method    openSettingsPage
   */
  openSettingsPage() {
    this.modalCtrl.create('SettingsPage').present();
  }

  /**
   * --------------------------------------------------------------
   * go on Hoop plus
   * --------------------------------------------------------------
   * @method    onHoopPlus
   */
  onHoopPlus() {

    if (this.profile_data.HoopPlus==="true"){
      this.showAlert();
    }else{
      this.modalCtrl.create('PaymentPage').present();
    }
    
 
    // this.db.object('/Users/'+this.profile_data.Name).query.ref.update({HoopPlus:'true'})
    // this.profile_data.HoopPlus='true'
    // this.storage.set('name',this.profile_data)

  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'you are already on Hoop plus!',
      buttons: ['OK']
    });
    alert.present();
  }
}


