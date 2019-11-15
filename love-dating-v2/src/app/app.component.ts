import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdmobProvider } from '../providers/admob/admob';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'LandingPage';

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public admobProvider: AdmobProvider,public translate :TranslateService,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      

      if (this.platform.is('ios') || this.platform.is('android')) {
        // Show Video Ad After 1 Minutes
        setInterval(() => {
          this.prepareAdmobVideo();
        }, 120000);

        // Show Interstitial Ad After 30 Sec
        setInterval(() => {
          this.prepareInterstitial();
        }, 60000);
      }
    });

    this.storage.get('lang').then((val)=>{
      if (val != null) {
        this.translate.use(val);
      }else{
        this.translate.use('en');
      }
    })
    
    
  }

  /**
   * Prepare and show admob Video ad
   */
  prepareAdmobVideo() {
    this.admobProvider.prepareAdmobVideo();
  }

  /**
   * Prepare and show admob Interstitial Ad
   */
  prepareInterstitial() {
    this.admobProvider.prepareInterstitial();
  }
}
