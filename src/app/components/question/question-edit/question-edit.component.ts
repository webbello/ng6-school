import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  questionForm: FormGroup;
  id:string = '';
  question:string = '';
  type:string = '';
  status:string = '';
  created:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: QuestionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getQuestion(this.route.snapshot.params['id']);
    this.questionForm = this.formBuilder.group({
      'question' : [null, Validators.required],
      'type' : [null, Validators.required],
      'status' : [null, Validators.required],
      'created' : [null, Validators.required]
    });
  }

  getQuestion(id) {
    this.api.getQuestion(id).subscribe(data => {
      this.id = data._id;
      this.questionForm.setValue({
        question: data.question,
        type: data.type,
        status: data.status,
        created: data.created
      });
    });
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
