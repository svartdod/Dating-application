import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatBoxPage } from './chat-box';

@NgModule({
  declarations: [
    ChatBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatBoxPage),
  ],
})
export class ChatBoxPageModule {}
