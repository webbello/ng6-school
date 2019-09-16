import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/chat/user';
import { Chart } from 'chart.js';
import { QuizResultModel } from '../../../models/socket/quiz';
import { ChatService } from '../../../services/chat.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  quiz: any = [];
  start: boolean = false;
  user: User;
  onlineUsers: [];
  ioConnection: any;
  quizResults: any = [];
  resultsTable: any = [];
  //chart data
  numToChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  chart: any = [];
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
  
  constructor(private route: ActivatedRoute, private authService: AuthService, private api: QuizService, private chatService: ChatService, private router: Router) { 

  }

  ngOnInit() {
    
    this.authService.getLoginUser()
      .subscribe(res => {
        //console.log(res);
        this.user = {
        //id: randomId,
        userId: res.user.id,
        name: res.user.name,
        email: res.user.email
      };
      }, err => {
        console.log(err);
      });
    this.getQuizDetails(this.route.snapshot.params['id']);
    this.getLastActiveUserByCourseId(this.quiz.courseId);

    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.initIoConnection();
    }

  }
  private initIoConnection(): void {
     
    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
        console.log('quizResult', quizResult);
        //console.log('this.user',this.user);
        // exclude sender from game
        if (quizResult.from.userId != this.user.userId) {
          this.quizResults.push(quizResult);
          this.resultsTable.push(createNewUser(quizResult));
        }
    
        this.dataSource = new MatTableDataSource(this.resultsTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log('quizResults', this.quizResults);
        this.prepareChart(this.quizResults);
        
      });
      
  }
  public prepareChart(quizResults) {
    let labelsChart = [];
    let dataChart = [];
    let qOption = [];
    quizResults.forEach((items, indexes) => {

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
      //console.log('Question Option', qOption);

      //console.log('i = ', dataChart)
    })
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
    
  }
  public getLastActiveUserByCourseId(courseId) {
    this.authService.getLastActiveUserByCourseId(courseId)
    .subscribe(res => {
      //console.log('last_active within 3 minute', res.last_active);
      this.onlineUsers = res.last_active;
    }, err => {
      console.log(err);
    });
  }
  getQuizDetails(id) {
    this.api.getQuiz(id)
      .subscribe(data => {
        console.log(data);
        this.quiz = data;
        //console.log('this.quiz',this.quiz);
      });

  }
  /**
   * [startQuiz description]
   * @param {string}  quizId [description]
   * @param {boolean} start  [description]
   */
  public startQuiz(courseId: number, quizId: string, start: boolean): void {
    //console.log(courseId);
      if (!quizId) {
        return;
      }
      this.start = start;
      this.chatService.startQuiz({
        id: quizId,
        courseId: courseId,
        from: this.user,
        start: this.start,
        duration: this.quiz.duration,
        created_at: new Date(),
      });
      console.log('this.quiz.duration', this.quiz.duration)
      setTimeout(()=> {
        //this.mode = 'result';
        this.start = false;
        //this.router.navigate(["/quiz"]);
      }, this.quiz.duration * 1000);

      this.api.updateQuiz(quizId, {last_played: new Date()})
      .subscribe(res => {
        if (!res.errors) {
          let id = res['_id'];
          this.quiz.last_played = new Date();
          console.log('id', id);
        }
        }, (err) => {
          console.log(err);
        }
      );
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewUser(quizResult): UserData {

  return {
    id: quizResult.id.toString(),
    name: quizResult.from.name,
    progress: quizResult.correctAnswerCount,
    color: quizResult.created_at
  };
}