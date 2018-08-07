import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent implements OnInit {

  quizForm: FormGroup;

  questionList: string[] = ['Choice1', 'Choice2', 'Choice3', 'Choice4'];

  constructor(private router: Router, private api: QuizService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'questions' []
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.api.postQuiz(form)
      .subscribe(res => {
        console.log(res);
          //let id = res['_id'];
          //this.router.navigate(['/quiz-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
