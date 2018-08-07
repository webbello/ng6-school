import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {

  questionForm: FormGroup;
  id:string = '';
  question:string = '';
  choices = [];
  type:string = '';
  status:string = '';
  created:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: QuestionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getQuestion(this.route.snapshot.params['id']);
    this.questionForm = this.formBuilder.group({
      'question' : [null, Validators.required],
       choices: this.formBuilder.array([]),
      'type' : [null, Validators.required],
      'status' : [null, Validators.required]
    });
  }

  getQuestion(id) {
    this.api.getQuestion(id).subscribe(data => {
      console.log(data);
      this.id = data._id;
      this.questionForm.setValue({
        question: data.name,
        choices: data.options,
        type: data.type,
        status: data.status,
        created: data.created
      });
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
    this.api.updateQuestion(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/question-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  questionDetails() {
    this.router.navigate(['/question-details', this.id]);
  }
}
