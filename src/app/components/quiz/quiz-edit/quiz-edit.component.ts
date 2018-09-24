import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {

  quizForm: FormGroup;
  questionList: any = [];
  id:string = '';
  name:string = '';
  description:string = '';
  status:string = '';
  created:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: QuizService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getQuiz(this.route.snapshot.params['id']);
    this.quizForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'questions' : [[], Validators.required],
      'creator' : [null, Validators.required],
      'created' : [null, Validators.required]
    });
  }

  getQuiz(id) {
    this.api.getQuiz(id).subscribe(data => {
      this.id = data._id;
      this.quizForm.setValue({
        name: data.name,
        description: data.description,
        questions: data.questions,
        creator: data.creator,
        created: data.created
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateQuiz(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/quiz-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  quizDetails() {
    this.router.navigate(['/quiz-details', this.id]);
  }
}
