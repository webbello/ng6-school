import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { User } from '../../../models/chat/user';
import { QuizChatModel } from '../../../models/chat/quiz';
import { QuizResultModel } from '../../../models/socket/quiz';
import { ChatService } from '../../../services/chat.service';
import { Chart } from 'chart.js';

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
  chart: any = [];

  constructor(private route: ActivatedRoute, private api: QuizService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.getQuizDetails(this.route.snapshot.params['id']);
    //var ctx = document.getElementById('canvas');
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
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
        //console.log(data);
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
