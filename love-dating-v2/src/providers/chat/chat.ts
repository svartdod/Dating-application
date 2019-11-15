/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of chat,
 * File path - '../../../src/providers/chat/chat'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Chat } from '../../models/chat';

@Injectable()
export class ChatProvider {

  // Observable array list of chat
  chats: Observable<Chat[]>;

  constructor(public http: HttpClient) { }

  /**
   * --------------------------------------------------------
   * Get History of Chat
   * --------------------------------------------------------
   */
  getChatHistoryData() {
    return Observable.create(observer => {
      return this.http.get('assets/data/chat.json').subscribe((data: any) => {
        this.chats = data.Chat;
        observer.next(this.chats);
        observer.complete();
      })
    });
  }

  /**
   * --------------------------------------------------------
   * Chat Reply Messages
   * --------------------------------------------------------
   */
  randomChatReplyMsg() {
    let messages = [
      "Let me see my schedule, I'll let you know.",
      "I miss you",
      "I am on my way",
      "I can’t think of anything better than getting a reply from you.",
      "I want this message to be the reason you smile at your screen.",
      "You deserve a whole sheet of gold stars.",
      "The truth? I like you a lot. And I don’t even know you yet. I just have an idea.",
      "I passed by your photo too many times not to stop a say hi.",
      "My atoms are attracted to your atoms.It’s chemistry.",
      "Hello amazingness.",
      "You make me smile.That is all.",
      "You had me at online now.",
      "I want to be the reason you look into your phone and smile.",
      "I was more excited to see your profile photo than pizza.And I really like pizza.",
      "I bet my dog would like you.",
      "I bet my cat would like you."
    ];
    return messages;
  }
}
