import { Component, OnInit } from '@angular/core';
import { Action } from '../../models/chat/action';
import { Event } from '../../models/chat/event';
import { Message } from '../../models/chat/message';
import { User } from '../../models/chat/user';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth/auth.service';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	action = Action;
	loginUser: any;
	user: User;
	messages: Message[] = [];
	messageContent: string;
	ioConnection: any;

  	constructor(private chatService: ChatService, private authService: AuthService) { }

	ngOnInit() {
    	const randomId = this.getRandomId();
		this.authService.getLoginUser()
	      .subscribe(res => {
	        console.log(res);
	        this.loginUser = res;
	        this.user = {
		      id: randomId,
		      userId: res.user.id,
		      name: res.user.name,
		      avatar: `${AVATAR_URL}/${randomId}.png`
		    };
	      }, err => {
	        console.log(err);
	      });
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

	private getRandomId(): number {
	    return Math.floor(Math.random() * (1000000)) + 1;
	}

	public sendMessage(message: string): void {
	    if (!message) {
	      return;
	    }

	    this.chatService.send({
	      from: this.user,
	      content: message,
	      created_at: new Date(),
	    });
	    this.messageContent = null;
	}

	public sendNotification(params: any, action: Action): void {
	    let message: Message;

	    if (action === Action.JOINED) {
	      message = {
	        from: this.user,
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

