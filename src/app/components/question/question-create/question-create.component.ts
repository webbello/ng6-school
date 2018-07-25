import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  questionForm: FormGroup;
  question:string='';
  type:string='';
  status:string='';
  choices = new FormControl();
  choicesList: string[] = ['Choice1', 'Choice2', 'Choice3', 'Choice4'];

  constructor(private router: Router, private api: QuestionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      'question' : [null, Validators.required],
      'type' : [null, Validators.required],
      'status' : [null, Validators.required],
      'choice1' : [null, Validators.required],
      'choice2' : [null, Validators.required],
      'choice3' : [null, Validators.required],
      'choice4' : [null, Validators.required],
      'choices' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.api.postQuestion(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/question-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
