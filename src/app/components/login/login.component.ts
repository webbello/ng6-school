import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
//import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username:string='';
  password:string='';

  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    //console.log(form.username);
    this.api.postLogin(form)
      .subscribe(res => {
          let token = res.token;
          console.log(res.message);
          if (res.success) {
            //localStorage.setItem('token', token);
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['/books']);
          }else {
            localStorage.setItem('currentUser', '');
          }
          console.log(localStorage.getItem('currentUser'))
        }, (err) => {
          console.log('irfan');
          console.log(err);
        });
  }

}
