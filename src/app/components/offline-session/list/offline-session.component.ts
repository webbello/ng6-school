import { Component, Inject, OnInit } from '@angular/core';
import { OfflineSessionService } from '../../../services/offline-session/offline-session.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';

export interface DialogData {
  course_id: string;
  name: string;
}

@Component({
  selector: 'app-offline-session',
  templateUrl: './offline-session.component.html',
  styleUrls: ['./offline-session.component.scss']
})
export class OfflineSessionComponent implements OnInit {
  sessions: any;
  response: any;
  breakpoint: number;

  course_id: string;
  name: string;

  constructor(private api: OfflineSessionService, private authService: AuthService, public dialog: MatDialog) { 
    this.authService.getLoginUser()
      .subscribe(res => {
        console.log('getLoginUser', res);
        //this.loginUser = res;
        let data = {
          course_id: res.courses
        }
        if (res.admin) {
          this.api.getOfflineSessions()
          .subscribe(res => {
            console.log(res);
            this.sessions = res.offlineSessions;
          }, err => {
            console.log(err);
          });
        } else {
          this.api.getOfflineSessionByRegisterdCourse(data)
          .subscribe(res => {
            console.log(res);
            this.response = res;
            this.sessions = this.response.offlineSessions;
          }, err => {
            console.log(err);
          });
        }
        
   
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  openFilterDialog(): void {
    
    const dialogRef = this.dialog.open(OfflineSessionDialog, {
      data: {name: this.name, course_id: this.course_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( result !== undefined) {

        this.course_id = result.course_id;
        this.name = result.name;
      
        let data = {
          course_id: this.course_id,
          search: this.name
        }
        this.api.getOfflineSessionFilter(data)
        .subscribe((res : any) => {
          console.log('getOfflineSessionFilter',res);
          this.sessions = res.offlineSessions;
        }, err => {
          console.log(err);
        });
        console.log('result', result);
      }
    });
  }

}

@Component({
  selector: 'offline-session-dialog',
  templateUrl: 'offline-session-dialog.html',
})
export class OfflineSessionDialog {
  courseList: any = [];
  constructor(
    public dialogRef: MatDialogRef<OfflineSessionDialog>, private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.quizService.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSessionByCourseId(course_id) {
    console.log('courseID', course_id);
  }

}
