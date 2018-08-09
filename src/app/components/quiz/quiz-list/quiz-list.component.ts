import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz/quiz.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizs: any;
  displayedColumns = ['name', 'description', 'status', 'created'];
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
  /**
   * [startQuiz description]
   * @param {string}  quizId [description]
   * @param {boolean} start  [description]
   */
  public startQuiz(quizId: string, start: boolean): void {
      if (!quizId) {
        return;
      }

      this.chatService.startQuiz({
        id: quizId,
        from: this.user,
        start: start,
        created_at: new Date(),
      });
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
