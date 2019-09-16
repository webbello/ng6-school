import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { QuestionService } from '../../../services/question/question.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent implements OnInit {

  quizForm: FormGroup;
  courseList: any = [];
  questionList: any = [];

  constructor(private router: Router, private api: QuizService, private questionService: QuestionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      'course' : [null, Validators.required],
      'name' : [null, Validators.required],
      'duration' : [60, Validators.required],
      'description' : [null, Validators.required],
      'questions': []
    });
    this.api.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
    
    // this.questionService.getQuestions()
    //   .subscribe(res => {
    //     console.log(res);
    //     this.questionList = res;
    //   }, err => {
    //     console.log(err);
    //   });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.api.postQuiz(form)
    .subscribe(res => {
    console.log(res);
      if (!res.errors) {
        this.router.navigate(['/quizs']);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
