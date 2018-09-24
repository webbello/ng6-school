import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question: any = {};

  constructor(private route: ActivatedRoute, private api: QuestionService, private router: Router) { }

  ngOnInit() {
    this.getQuestionDetails(this.route.snapshot.params['id']);
  }

  getQuestionDetails(id) {
    this.api.getQuestion(id)
      .subscribe(data => {
        console.log(data);
        this.question = data;
      });
  }

  deleteQuestion(id) {
    this.api.deleteQuestion(id)
      .subscribe(res => {
          this.router.navigate(['/questions']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
