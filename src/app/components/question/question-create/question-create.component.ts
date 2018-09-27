import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  questionForm: FormGroup;

  // answersList: string[] = ['Choice1', 'Choice2', 'Choice3', 'Choice4'];

  constructor(private router: Router, private api: QuestionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      'question' : [null, Validators.required],
       choices: this.formBuilder.array([]),
      'type' : [null, Validators.required],
      'status' : [null, Validators.required]
    });
  }
  get choiceForms() {
    return this.questionForm.get('choices') as FormArray
  }

  addChoice() {

    const choice = this.formBuilder.group({ 
      name: [null, Validators.required],
      isAnswer: [false, Validators.required],
    })

    this.choiceForms.push(choice);
  }

  deleteChoice(i) {
    this.choiceForms.removeAt(i)
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.api.postQuestion(form)
      .subscribe(res => {
        console.log(res);
          //let id = res['_id'];
          //this.router.navigate(['/question-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
