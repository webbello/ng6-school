import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doLogin(event){
  	const target = event.target;
  	const username = target.querySelector('#name').value;
  	console.log(username);

  }

}
