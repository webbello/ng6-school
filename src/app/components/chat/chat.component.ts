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
	live_lecture: any;
	messages: Message[] = [];
	messageContent: string;
	parent_id: any;
	parent_name: string;
	parent_content: any;
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
		  this.authService.getLiveLectureUrl()
			.subscribe(res => {
				//console.log('getLiveLacture', res.live_url);
				this.live_lecture = res.live_url;
				this.getChatHistory(this.live_lecture.lecture_id, this.live_lecture.course_id);
			}, err => {
				console.log(err);
			});
	  	this.initIoConnection();
	}

	private initIoConnection(): void {

	    this.ioConnection = this.chatService.onMessage()
	      .subscribe((message: Message) => {
			console.log('message', message)
			this.messages.push(message);
			let scrollElem = document.getElementById('conv');
			scrollElem.scrollTop = scrollElem.scrollHeight;
			// this.scrollTo('scrollToBottom');
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

	getChatHistory(lecture_id: number, course_id: number){
		this.authService.getChatHistory(lecture_id, course_id)
			.subscribe(res => {
				console.log('getChatHistory', res);
				if (res.message) {
					this.messages = res.message;
				}
				//console.log('getChatHistory', this.messages);

			}, err => {
				console.log(err);
			});
	}

	private getRandomId(): number {
	    return Math.floor(Math.random() * (1000000)) + 1;
	}

	public sendMessage(message: string): void {
	    if (!message) {
	      return;
	    }
		console.log('this.live_lecture ', this.live_lecture.lecture_id );
	    this.chatService.send({
	      from: this.user,
		  content: message,
		  parent_id: this.parent_id,
		  parent_message: {
			  parent_name: this.parent_name,
			  parent_content: this.parent_content
		  },
		  lecture_id: this.live_lecture.lecture_id,
		  course_id: this.live_lecture.course_id,
	      created_at: new Date(),
		});
		//let lastMessage = this.messages[this.messages.length - 1]; 
		let scrollElem = document.getElementById('conv');
		scrollElem.scrollTop = scrollElem.scrollHeight;

		// this.scrollTo(lastMessage._id);
		this.messageContent = null;
		this.parent_id = null;
	}

	public scrollTo(id) {
		var elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	public reply(parent_id, parent_name, parent_content) {
		this.parent_id = parent_id;
		this.parent_name = parent_name;
		this.parent_content = parent_content;
		document.getElementById("mat-input-0").focus();

		console.log('this.replyId',this.parent_id);
	}
	deleteMessage(lecture_id, course_id, id, index) {
		this.authService.deleteMessage(lecture_id, course_id, id)
		  .subscribe(res => {
			  console.log(res)
			  if (res) {
				this.messages.splice(index, 1);
			  }
			  //this.router.navigate(['/quizs']);
			}, (err) => {
			  console.log(err);
			}
		);
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

