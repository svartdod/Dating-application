import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Platform,AlertController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';

import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  products = []
  id_products = { ios:'hoop_plus_1_mois',
                  android:''}
  platform_os = ''
  profile_data :User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iap: InAppPurchase,
              public storage: Storage, 
              public db: AngularFireDatabase,
              public viewCtrl: ViewController,
              public platform: Platform,
              public alertCtrl: AlertController) {
                this.storage.get('name').then((val)=>{
                  this.profile_data = val;
                });
                // this.products = [{ productId: 'product1', 'title': 'Hoop plus', description: 'chat more', price: '99 $' }];
                if(this.platform.is('android')){
                  this.platform_os='android'
                }
                if(this.platform.is('ios')){
                  this.platform_os='ios'
                }
                this.iap
                      .getProducts(this.id_products[this.platform_os])
                      .then((products) => {
                        console.log(products);
                          //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
                        this.products = products;
                        })
                      .catch((err) => {
                        console.log(err);
                      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  purshase_subscription(product_id){
    this.iap
      .buy(product_id)
      .then((data)=> {
        console.log(data);
        this.db.object('/Users/'+this.profile_data.Name).query.ref.update({HoopPlus:'true'});
        this.profile_data.HoopPlus='true';
        this.storage.set('name',this.profile_data);
      })
      .catch((err)=> {
        console.log(err);
      });
      }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
