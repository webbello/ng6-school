import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz/quiz.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Event } from '../../../models/chat/event';
import { Message } from '../../../models/chat/message';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizs: any;
  start: boolean = false;
  ioConnection: any;
  displayedColumns = ['name', 'description', 'status', 'created', 'action'];
  dataSource = new QuizDataSource(this.api);

  constructor(private api: QuizService, private chatService: ChatService) { }

  ngOnInit() {
    this.api.getQuizs()
      .subscribe(res => {
        console.log(res);
        this.quizs = res;
      }, err => {
        console.log(err);
      });
  }

  private initIoConnection(): void {

      this.ioConnection = this.chatService.onMessage()
        .subscribe((message: Message) => {
          //console.log(message.content);
          this.start = message.content;
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
   public startQuiz(message: string, quizId: string): void {
    this.initIoConnection();
    console.log(quizId);
      if (!message) {

        return;
      }

      this.chatService.send({
        from: {
          id: 1,
          name: 'Irfan',
          avatar: 'https://avatars3.githubusercontent.com/u/2644084?s=460&v=4'
      },
        content: message,
        quizId: quizId
      });
      //this.messageContent = null;
  }
  public stopQuiz(message: string, quizId: string): void {

      this.chatService.send({
        from: {
          id: 1,
          name: 'Irfan',
          avatar: 'https://avatars3.githubusercontent.com/u/2644084?s=460&v=4'
      },
        content: message
      });
      //this.messageContent = null;
  }
}

export class QuizDataSource extends DataSource<any> {
  constructor(private api: QuizService) {
    super()
  }

  connect() {
    return this.api.getQuizs();
  }

  disconnect() {

  }
}
