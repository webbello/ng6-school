import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  quiz = {};

  constructor(private route: ActivatedRoute, private api: QuizService, private router: Router) { }

  ngOnInit() {
    this.getQuizDetails(this.route.snapshot.params['id']);
  }

  getQuizDetails(id) {
    this.api.getQuiz(id)
      .subscribe(data => {
        console.log(data);
        this.quiz = data;
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
