/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Edit Profile
 * File path - '../../../../src/pages/edit-profile/edit-profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { User } from "../../models/user";
import *as firebase from'firebase';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public base64Image: string;
  img1: any = 'assets/imgs/13.jpg';
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
    profile_data :User;
filename:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,public storage: Storage) {

   
    storage.get('name').then((val) => {
  this.profile_data=val;
  console.log(this.profile_data.Gender);

  });


  }

  /**
   * --------------------------------------------------------------
   * Open Gallery & Select Photo
   * --------------------------------------------------------------
   * @method    takePhoto
   * @param     num    Image Number
   */
  takePhoto(num) {
    // Camera Options
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options).then((base64String: string) => {
      this.base64Image = "data:image/*;base64," + base64String;

      if (num == 1) {
        this.img1 = this.base64Image;


       

        
      }
     
    }, (err) => {
      console.log(err);
    });








 //   picture.push(this.img1,'data_url');
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss(w) {
    /*if(typeof( x ) == "undefined") x=this.profile_data.About;
      if(typeof( y ) == "undefined") y=this.profile_data.JobTitle;

      if(typeof( z ) == "undefined") z=this.profile_data.Company;

      if(typeof( w ) == "undefined") w=this.profile_data.Gender;
          console.log(x+" "+y+" "+z+" "+w);*/
           if(typeof( w ) == "undefined") w=this.profile_data.Gender;

          console.log("LOOOG"+this.profile_data.Name);
          if(typeof( this.filename ) == "undefined") this.filename=this.profile_data.Images;


           try{

            console.log('upload images');
            this.filename   = Math.floor(Date.now() / 1000);
          let storageRef = firebase.storage().ref();
          const imageRef = storageRef.child(`Images_profile/${this.filename}.jpg`);
          imageRef.putString(this.img1, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
      console.log("loool");
     });
    console.log("Anyway");}
    catch 
    {

      this.filename=this.profile_data.Images;

    }



      firebase.database().ref().child("Users/"+this.profile_data.Name).update({Gender: w,Images:this.filename});

     
      // this.navCtrl.setRoot('ProfilePage')
   this.viewCtrl.dismiss();
  }



}
