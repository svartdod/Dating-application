import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwingModule } from 'angular2-swing';
import { SwipePage } from './swipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SwipePage,
  ],
  imports: [
    SwingModule,
    IonicPageModule.forChild(SwipePage),
    TranslateModule.forChild()
  ],
})
export class SwipePageModule { }
