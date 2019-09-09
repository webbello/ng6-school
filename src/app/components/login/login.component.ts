import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { first } from 'rxjs/operators';
import * as moment from "moment";
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  alert = true;
  hide = true;
  success: boolean;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  username:string='';
  password:string='';
  message:string='';
  error = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private api: AuthService, 
    private formBuilder: FormBuilder) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onFormSubmit(form:NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          console.log(data)
          this.message = data.message;
          this.alert = data.success;
          if (data.success) {
            this.router.navigate(['/quiz']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
