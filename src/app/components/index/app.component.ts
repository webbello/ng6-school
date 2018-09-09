import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loginUser: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    if (!this.authService.isLoggedIn()) {
      console.log('not login')
      this.authService.logout();
    }

    this.authService.getLoginUser()
      .subscribe(res => {
        console.log(res);
        this.loginUser = res;
      }, err => {
        console.log(err);
      });
  }
}
