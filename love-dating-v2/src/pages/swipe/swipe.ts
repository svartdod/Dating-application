
/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Swipe Page
 * File path - '../../../../src/pages/swipe/swipe'
 */


import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { Direction, StackConfig, SwingStackComponent, SwingCardComponent } from 'angular2-swing';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


@IonicPage()
@Component({
  selector: 'page-swipe',
  templateUrl: 'swipe.html',
})
export class SwipePage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  // Array list of users
  users: Array<User> = [];

  hits = new BehaviorSubject([])
  subscription: any;

    itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  // Swing Card Configuration
  stackConfig: StackConfig;


  // Recent Swipe User
  swipeUser: any = '';
  public variable :any="zrax";
  profile_data :User;
  store:any;
  dbRef: any;
  geoFire: any;

  lat: number;
  lng: number;
  markers = [];
  id :any=''


  constructor(private dataProvider: DataProvider,
    public modalCtrl: ModalController,public storage: Storage,public db: AngularFireDatabase,private geolocation: Geolocation) {
    //   this.itemsRef = this.db.list('/Users');
    //   this.items = this.itemsRef.valueChanges();
    
    // this.items.subscribe((items: Array<User>) => {this.users=items;
    //   console.log(this.users)});
    

   }

  ngOnInit() {
    this.cardConfig();
    this.dbRef = this.db.list('/user_location');
    this.geoFire = new GeoFire(this.dbRef.query.ref);
    this.storage.get('name').then((val) => {
      this.profile_data=val;
      // console.log(val.genderInterest)
      this.storage.get('store').then((val)=>{
        this.store = val;
        this.getUserLocation(this.geolocation,this.store.rangeSearch,[this.store.ageRange[0],this.store.ageRange[1]])
      })
      
    

  });    
    
    //this.getUserList();
  }

  /**
   * --------------------------------------------------------------
   * List of users
   * --------------------------------------------------------------
   * @method    getUserList
   */
  getUserList() {
    this.dataProvider.getUserList().subscribe(data => {


      this.users = data;
    })
  }

  /**
   * --------------------------------------------------------------
   * Set card stack configuration
   * --------------------------------------------------------------
   * @method    getUserList
   * 
   * See https://github.com/ksachdeva/angular2-swing
   * See https://github.com/gajus/swing
   */
  cardConfig() {
    this.stackConfig = {
      allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 2), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  /**
   * --------------------------------------------------------------
   * Called whenever we drag an element
   * --------------------------------------------------------------
   * @method    onItemMove
   */
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  /**
   * --------------------------------------------------------------
   *  Like/Dislike
   * --------------------------------------------------------------
   * @method    like    This method remove user from card stack and boolean status value
   * determine like/dislike decision.
   * @param     status  
   */
  like(status: boolean) {

    // Currently removed user from card
    let removedUser = this.users.pop();

    // If status is true, current user like this `removedUser` user otherwise dislike
    if (status) {
      this.swipeUser = removedUser;
      console.log(this.swipeUser)
      this.goToMatchPage(this.swipeUser);
      this.generate_id(this.swipeUser.Username,this.profile_data.Name)
      var name = this.profile_data.Name
      this.db.list('/Matches/'+this.id).set(this.profile_data.Name,{name:this.profile_data.Name})
    } else {
      this.swipeUser = removedUser;
    }
  }

  /**
   * --------------------------------------------------------------
   *  Go To Match Page
   * --------------------------------------------------------------
   * @method    goToMatchPage
   */
  goToMatchPage(user) {
    this.modalCtrl.create('MatchPage', { user: user }).present();
  }

  /**
   * --------------------------------------------------------------
   *  Open Profile Details Page
   * --------------------------------------------------------------
   * @method    goToProfileDetailsPage
   */
  goToUserDetailsPage(user) {
    this.modalCtrl.create('UserDetailsPage', { user: user }).present();
  }

  /**
   * --------------------------------------------------------------
   *  Refresh Card
   * --------------------------------------------------------------
   * @method    refresh
   */
  refresh() {

//  this.itemsRef = this.db.list('/Users');
    // this.items = this.itemsRef.valueChanges();
    // this.items.subscribe((items: Array<User>) => this.users=items);
    this.getUserLocation(this.geolocation,10000,[10,40]);
     // this.navCtrl.setRoot('HomePage');
    //this.getUserList();
  }

  getLocations(radius: number, coords: Array<number>,gender_interst,username,ageRange) {
    
    this.users=[]
  
  
    // console.log(username)
    if (gender_interst !== 'ALL'){
      
      this.geoFire.query({
        center: coords,
        radius: radius
      }).on('key_entered', (key, location, distance) => {
        let hit = {
          key:key,
          location: location,
          distance: distance
        }
        if (hit.key !== username){
          
          this.db.object('/Users'+'/'+hit.key).valueChanges().subscribe((action:User)=>{
            
           
            
        
              if (action.Gender === gender_interst && Number(action.Age) > Number(ageRange[0]) && Number(action.Age) < Number(ageRange[1]) ) {
              
                this.users.push(action)
                
              }
            
          });
        }
      })
      
    }else{
      
      this.geoFire.query({
        center: coords,
        radius: radius
      }).on('key_entered', (key, location, distance) => {
        let hit = {
          key:key,
          location: location,
          distance: distance
        }
        if (hit.key !== username){
          
          this.db.object('/Users'+'/'+hit.key).valueChanges().subscribe((action:User)=>{
            
            
            
              console.log(action)
              
              if (Number(action.Age) > Number(ageRange[0]) && Number(action.Age) < Number(ageRange[1])) {
                
                
                this.users.push(action)
                
                // let currentHits = this.hits.value
                // currentHits.push(element.val())
                // this.hits.next(currentHits)
                // this.markers.push(hit)
              }
            });
        }       
      })
      
    }
    
   
    
   
   }
  getUserLocation(geoloc: Geolocation,radius:number,ageRange) {
    /// locate the user
    console.log(radius)
    console.log(ageRange)
    geoloc.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      this.getLocations(100000, [this.lat, this.lng],this.profile_data.genderInterest,this.profile_data.Name,ageRange)    
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  generate_id(senderName,receiverName){
    
    if (senderName <receiverName) {
      this.id = senderName +'|'+ receiverName
    }else{
      this.id = receiverName +'|'+ senderName
    }
  }
}

