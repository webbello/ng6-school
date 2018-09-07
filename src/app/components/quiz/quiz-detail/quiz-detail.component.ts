import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { User } from '../../../models/chat/user';
import { QuizChatModel } from '../../../models/chat/quiz';
import { QuizResultModel } from '../../../models/socket/quiz';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  quiz = {};
  user: User;
  ioConnection: any;
  quizResults: any = [];

  constructor(private route: ActivatedRoute, private api: QuizService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.getQuizDetails(this.route.snapshot.params['id']);
    this.initIoConnection();
  }
  private initIoConnection(): void {

    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
      console.log(quizResult);
      this.quizResults.push(quizResult);
    });
  }

  getQuizDetails(id) {
    this.api.getQuiz(id)
      .subscribe(data => {
        console.log(data);
        this.quiz = data;
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

  deleteQuiz(id) {
    this.api.deleteQuiz(id)
      .subscribe(res => {
          this.router.navigate(['/quizs']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
