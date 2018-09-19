import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';
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
  datasets: any = {'label': '', 'data': [], 'backgroundColor': [], 'correctAnswer': []};
  data: any = {'labels': [],'datasets': [this.datasets], 'type': ''};
  backgroundColor: any = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
  ];
  borderColor: any = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
  ];
  

  constructor(private route: ActivatedRoute, private authService: AuthService, private api: QuizService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoginUser()
      .subscribe(res => {
        this.user = {
        //id: randomId,
        userId: res._id,
        name: res.name
      };
      }, err => {
        console.log(err);
      });
    this.getQuizDetails(this.route.snapshot.params['id']);
    //console.log(this.quiz);
    this.initIoConnection();
    this.canvasId = 'canvas';
    this.data.type = 'bar';
    this.data.labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    this.datasets.label = '# of Votes';
    this.datasets.data = [12, 19, 3, 5, 2, 3];
    this.datasets.backgroundColor = this.backgroundColor;
    this.datasets.correctAnswer = [0, 0, 1, 0, 0, 0];
    console.log(this.data);
    //this.makeChart(this.canvasId, this.data);
    // this.getChart(this.canvasId, this.type, this.labels, this.label, this.data);
    // this.getChart('canvas1', 'line', this.labels, this.label, this.data);
    // this.getChart('canvas2', 'pie', this.labels, this.label, this.data);
    // this.getChart('bubbleCanvas', 'bubble', this.labels, this.label, this.data);
  }
  private initIoConnection(): void {
     
    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
      
      this.quizResults.push(quizResult);
      let labelsChart = [];
      let dataChart = [];
      let qOption = [];
      this.quizResults.forEach((items, indexes) => {

        items.questions.forEach((question, qi) => {
          if (typeof dataChart[qi] === 'undefined') {
            labelsChart[qi] = [];
            dataChart[qi] = [];
            qOption[qi] = [];
          }
          question.options.forEach((item, index) => {

            labelsChart[qi][index] = this.numToChar[index];
            qOption[qi][index] = item.name;
            // Index of correct Answer
            if(item.isAnswer){
              labelsChart[qi][index] = [this.numToChar[index], 'Correct'];
            }

            if (dataChart[qi][index] == null){
                dataChart[qi][index] = 0;
            }

            if(item.selected){
              dataChart[qi][index] += 1;
            }

            

          });

          this.getChart(question.id, 'bar', labelsChart[qi], question.name, dataChart[qi], qOption[qi], this.quizResults.length);

        });
        console.log('Question Option', qOption);

        //console.log('i = ', dataChart)
      })
      console.log('data', dataChart)
      
    });
    
  }
  public makeChart(canvasId, data) {
    this.chart = new Chart(canvasId, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });

    // Define a plugin to provide data labels
    Chart.plugins.register({
      afterDatasetsDraw: function(chart) {
        var ctx = chart.ctx;
        chart.data.datasets.forEach(function(dataset, i) {
          
          var meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgb(0, 0, 0)';

              var fontSize = 16;
              var fontStyle = 'normal';
              var fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              var dataString = dataset.data[index].toString();


              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              var padding = 5;
              var position = element.tooltipPosition();
              ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
            });
          }
        });
      }
    });
  }
  public getChart(canvasId, type, labels, label, data, qOption, numOfStudent) {
    //console.log(labels);
    this.chart = new Chart(canvasId, {
        type: type,
        data: {
            labels: labels,
            qOption: qOption,
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
          responsive: true,
          legend: {
            position: 'top',
          },
          scales: {
            
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Participant: '+ numOfStudent
              },
              ticks: {
                  //min: 0,
                  beginAtZero:true,
                  // forces step size to be 5 units
                  //stepSize: 2
              }
            }]
          },
          tooltips: {
          mode: 'index',
          callbacks: {
            // Use the footer callback to display the sum of the items showing in the tooltip
            title: function(tooltipItem, data) {
              
                var label = data.qOption[tooltipItem[0].index] || '';
                return label
            }
          },
          footerFontStyle: 'normal'
        },
        }
    });
    Chart.plugins.register({
      afterDatasetsDraw: function(chart) {
        var ctx = chart.ctx;
        chart.data.datasets.forEach(function(dataset, i) {
          //console.log(dataset)
          var meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgb(0, 0, 0)';

              var fontSize = 16;
              var fontStyle = 'normal';
              var fontFamily = 'Helvetica Neue';
              ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              
              var dataString = dataset.data[index].toString();
              

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              var padding = 5;
              var position = element.tooltipPosition();
              ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
            });
          }
        });
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
