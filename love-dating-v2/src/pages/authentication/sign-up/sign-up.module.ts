import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    TranslateModule.forChild()
  ],
})
export class SignUpPageModule {}
