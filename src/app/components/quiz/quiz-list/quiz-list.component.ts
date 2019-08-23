import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizs: any;
  onlineUsers: [];
  start: boolean = false;
  ioConnection: any;
  displayedColumns = ['name', 'description', 'status', 'created', 'action'];
  dataSource = new QuizDataSource(this.api);

  constructor(private api: QuizService, private authService: AuthService) { 
    this.getLastActiveUsers();
  }

  ngOnInit() {
    
    this.api.getQuizs()
      .subscribe(res => {
        console.log(res);
        this.quizs = res;
      }, err => {
        console.log(err);
      });
    
  }

  public getLastActiveUsers() {
    this.authService.getLastActiveUsers()
    .subscribe(res => {
      //console.log(res.last_active);
      this.onlineUsers = res.last_active;
    }, err => {
      console.log(err);
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
