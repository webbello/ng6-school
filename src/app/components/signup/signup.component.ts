import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  name:string='';
  email:string='';
  username:string='';
  password:string='';

  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    //console.log(form.username);
    this.api.postSignup(form)
      .subscribe(res => {
          console.log(res.message);
          if (res.success) {
            this.router.navigate(['/books']);
          }
        }, (err) => {
          console.log(err);
        });
  }

}
