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
  }
  private initIoConnection(): void {
     
    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
      
      this.quizResults.push(quizResult);
      //console.log(this.quizResults);
      let i = 1;
      this.quizResults.forEach((items, indexes) => {
        
        items.questions.forEach((question, qi) => {
          let dataChart = [];
          let labelsChart = [];
          let j = 1;
          question.options.forEach((item, index) => {
            labelsChart.push(this.numToChar[index]);

            //console.log(dataChart);
            // dataChart.push(i-j);
            dataChart[index] = i-j;
            if (item.selected) {
              dataChart[index] += 1;
              j++
              
            }
            
            //console.log(index); // 0, 1, 2
          });
          //console.log(labelsChart);
          console.log(dataChart);
          this.getChart(question.id, 'bar', labelsChart, question.name, dataChart);
          //console.log(items); // 1, 2, 3
          //console.log(indexes); // 0, 1, 2
        }
      i++;
      });
      console.log(i);
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
