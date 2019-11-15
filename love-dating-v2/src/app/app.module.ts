import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdMobFree } from '@ionic-native/admob-free';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { SwingModule } from 'angular2-swing';
import { DataProvider } from '../providers/data/data';
import { GiphyProvider } from '../providers/giphy/giphy';

import { UserProfilePopover } from '../pages/user-details/user-details';
import { ChatProvider } from '../providers/chat/chat';
import { AdmobProvider } from '../providers/admob/admob';


import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';

import {InAppPurchase} from '@ionic-native/in-app-purchase';

import { TranslateModule, TranslateLoader,TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebaseAuth= {
  apiKey: "AIzaSyAudGUZAXZHwzykoqXHYOPPNQpHa3OO-54",
  authDomain: "love-dating-3dc0b.firebaseapp.com",
  databaseURL: "https://love-dating-3dc0b.firebaseio.com/",
  projectId: "love-dating-3dc0b",
  storageBucket: "love-dating-3dc0b.appspot.com",
  messagingSenderId: "1018514388547"
};

// const firebaseAuth = {
//   apiKey: "AIzaSyDv94Qcp_NVaLLEqEKXQZYCK7QSSFcXyGg",
//   authDomain: "hoop-7cf04.firebaseapp.com",
//   databaseURL: "https://hoop-7cf04.firebaseio.com",
//   projectId: "hoop-7cf04",
//   storageBucket: "hoop-7cf04.appspot.com",
//   messagingSenderId: "753582359971"
// };


@NgModule({
  declarations: [
    MyApp,
    UserProfilePopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SwingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireDatabaseModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserProfilePopover
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    HttpClient,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AdMobFree,
    DataProvider,
    GiphyProvider,
    ChatProvider,
    AdmobProvider,
    InAppPurchase
  ]
})
export class AppModule { }
