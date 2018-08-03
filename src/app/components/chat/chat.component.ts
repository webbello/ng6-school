import { Component, OnInit } from '@angular/core';
import { Action } from '../../models/chat/action';
import { Event } from '../../models/chat/event';
import { Message } from '../../models/chat/message';
import { User } from '../../models/chat/user';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	action = Action;
	user: User;
	messages: Message[] = [];
	messageContent: string;
	ioConnection: any;

  	constructor(private chatService: ChatService) { }

	ngOnInit() {
	  	this.initIoConnection();
	}

	private initIoConnection(): void {

	    this.ioConnection = this.chatService.onMessage()
	      .subscribe((message: Message) => {
	        this.messages.push(message);
	      });

	    this.chatService.onEvent(Event.CONNECT)
	      .subscribe(() => {
	        console.log('connected');
	      });
	      
	    this.chatService.onEvent(Event.DISCONNECT)
	      .subscribe(() => {
	        console.log('disconnected');
	      });
	}

	public sendMessage(message: string): void {
	    if (!message) {
	      return;
	    }

	    this.chatService.send({
	      from: {
			    id: 1,
			    name: 'Irfan',
			    avatar: 'https://avatars3.githubusercontent.com/u/2644084?s=460&v=4'
			},
	      content: message
	    });
	    this.messageContent = null;
	}

	public sendNotification(params: any, action: Action): void {
	    let message: Message;

	    if (action === Action.JOINED) {
	      message = {
	        from: {
			    id: 1,
			    name: 'Irfan',
			    avatar: 'string'
			},
	        action: action
	      }
	    } else if (action === Action.RENAME) {
	      message = {
	        action: action,
	        content: {
	          username: this.user.name,
	          previousUsername: params.previousUsername
	        }
	      };
	    }

	    this.chatService.send(message);
	}
}

