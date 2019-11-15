import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(EditProfilePage),
    TranslateModule.forChild()
  ],
})
export class EditProfilePageModule { }
