import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz/quiz.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizs: any;
  displayedColumns = ['name', 'description', 'status', 'created'];
  dataSource = new QuizDataSource(this.api);

  constructor(private api: QuizService) { }

  ngOnInit() {
    this.api.getQuizs()
      .subscribe(res => {
        console.log(res);
        this.quizs = res;
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
