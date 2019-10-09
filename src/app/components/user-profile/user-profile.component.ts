import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/chat/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  courses: [];
  study_material: [];
  constructor(private authService: AuthService, private log: LogService) { 
    //this.rating = 2;
    this.authService.getLoginUser()
      .subscribe(res => {
        console.log('getLoginUser', res);
        //this.loginUser = res;
        this.user = res.user;
        this.courses = res.courses;
        this.getStudyMaterialByCourseList({courseList: this.courses});
        
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }
  getStudyMaterialByCourseList(courseList) {
    this.authService.getStudyMaterialByCourseList(courseList)
      .subscribe(res => {
        console.log('study_material', res.study_material);
        //this.loginUser = res;
        this.study_material = res.study_material;
      }, err => {
        console.log(err);
      });
  }

}
