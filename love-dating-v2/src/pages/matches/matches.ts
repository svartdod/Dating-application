/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Matches
 * File path - '../../../../src/pages/matches/matches'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  users = [];
  profile_info: User;
  Image:any;
  matches_user : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    private db: AngularFireDatabase,
    public storage: Storage) { }

  /** Do any initialization */
  ngOnInit() {
    this.storage.get('name').then((val)=>{
      this.profile_info = val;
      this.getUserMatches();
      this.getUserList();
      
    })
    
  }

  /**
   * --------------------------------------------------------------
   * List of users
   * --------------------------------------------------------------
   * @method    getUserList
   */
  getUserList() {
    // this.dataProvider.getUserList().subscribe((data: any) => {
    //   this.users = data;
    // });
    this.db.list('/chats').snapshotChanges().subscribe((actions)=>{
      this.users = []
      actions.forEach((element) => {
        if (element.key.includes(this.profile_info.Name)) {
          console.log(element.payload.val())
          // console.log(element.payload.key.includes(this.profile_info.Name))
          this.db.list('/Matches/'+element.key).snapshotChanges().subscribe((subs)=>{
            
            subs.forEach(sub =>{
              
              if (sub.key === this.profile_info.Name) {
                let tmp = element.key.split('|')
                tmp.splice(tmp.indexOf(this.profile_info.Name),1)
                this.db.object('/Users/'+tmp[0]).valueChanges().subscribe((action:any)=>{
                  
                  this.Image="https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+action.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb"
                  this.users.push(action)
                  
      
                });
              }
            });
          });
          
        }
      });
    });
  }

  /**
   * --------------------------------------------------------------
   * List of matches
   * --------------------------------------------------------------
   * @method    getUserMatches
   */
  getUserMatches() {
    var nameMatch = '';
    this.db.list('/Matches').snapshotChanges().subscribe((actions)=>{
      this.matches_user = []
      actions.forEach((element) => {
        if (element.payload.key.includes(this.profile_info.Name)) {
          nameMatch = element.key
          // console.log(element.payload.key.includes(this.profile_info.Name))
          if(element.payload.numChildren()>1){
            let tmp = nameMatch.split('|')
            
            tmp.splice(tmp.indexOf(this.profile_info.Name),1)
            this.db.object('/Users/'+tmp[0]).valueChanges().subscribe((action:any)=>{
              this.Image="https://firebasestorage.googleapis.com/v0/b/love-dating-3dc0b.appspot.com/o/Images_profile%2F"+action.Images+".jpg?alt=media&token=6d0e7c26-753f-4eec-a456-a7d0381e7afb"
              this.matches_user.push(action)
              console.log(action)
            });
          }         
        }
      });
    });
  }

  /**
   * --------------------------------------------------------------
   * Open Chat Page
   * --------------------------------------------------------------
   * @method    openChatBox
   */
  openChatBox(user:User) {
    this.modalCtrl.create('ChatBoxPage',{ userReceiver: user,userSender: this.profile_info }).present();
  }

  
}
