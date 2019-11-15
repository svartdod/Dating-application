import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchesPage } from './matches';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MatchesPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchesPage),
    TranslateModule.forChild()
  ],
})
export class MatchesPageModule {}
