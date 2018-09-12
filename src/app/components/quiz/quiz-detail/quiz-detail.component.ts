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

  quiz: any = [];
  user: User;
  ioConnection: any;
  quizResults: any = [];
  numToChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  chart: any = [];
  //chart data
  canvasId: any;
  type: any;
  labels: any = [];
  label: any;
  data: any = [];

  constructor(private route: ActivatedRoute, private api: QuizService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.getQuizDetails(this.route.snapshot.params['id']);
    //console.log(this.quiz);
    this.initIoConnection();
    //console.log(this.numToChar[0]);
    //chart data
    this.canvasId = 'canvas';
    this.type = 'bar';
    this.labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    this.label = '# of Votes';
    this.data = [12, 19, 3, 5, 2, 3];
    this.getChart(this.canvasId, this.type, this.labels, this.label, this.data);
    this.getChart('canvas1', 'line', this.labels, this.label, this.data);
    this.getChart('canvas2', 'pie', this.labels, this.label, this.data);
    this.getChart('bubbleCanvas', 'bubble', this.labels, this.label, this.data);
  }
  private initIoConnection(): void {
     
    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
      
      this.quizResults.push(quizResult);
      //console.log(this.quizResults);
      let i = 0;
      this.quizResults.forEach((items, indexes) => {

        let labelsChart = ['A', 'B', 'C', 'D', 'E'];
        let j = 0;
        // let newDataChart = [];
        items.questions.forEach((question, qi) => {
          let dataChart = [];
          // newDataChart[qi] = [];

          let k = 0;
          question.options.forEach((item, index) => {
            // check if array value is false or NaN
            if (isNaN(dataChart[index])) {
                dataChart[index] = 0;
                console.log("NaN found at place " + i);
            } else {
              dataChart[index] += 0;
            }
            
            if (item.selected) {
              dataChart[index] += 1;
            }
            // newDataChart[qi][index] = dataChart[index];
            k++;

          });
          j++;
          //console.log('Old Index',oldIndex);
          console.log(j, dataChart);
          //console.log('new Chart', newDataChart);
          this.getChart(question.id, 'bar', labelsChart, question.name, dataChart);
        },
        //console.log('Two Dimen', newDataChart);
        i++
      });
      console.log('i = ', i);
    });
    
  }

  public getChart(canvasId, type, labels, label, data) {
    //console.log(labels);
    this.chart = new Chart(canvasId, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
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
