import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: any;
  displayedColumns = ['question', 'type', 'status', 'created'];
  dataSource = new QuestionDataSource(this.api);

  constructor(private api: QuestionService) { }

  ngOnInit() {
    this.api.getQuestions()
      .subscribe(res => {
        console.log(res);
        this.questions = res;
      }, err => {
        console.log(err);
      });
  }
}

export class QuestionDataSource extends DataSource<any> {
  constructor(private api: QuestionService) {
    super()
  }

  connect() {
    return this.api.getQuestions();
  }

  disconnect() {

  }
}
