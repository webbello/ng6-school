import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { QuizService } from '../../services/quiz/quiz.service';
import { Action } from '../../models/chat/action';
import { User } from '../../models/chat/user';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit {
  action = Action;
  loginUser: any;
  user: User;
  courseId: number;
  courseList: any = [];
  lectureId: number;
  lectureList: any = [];
  messages: any = [];

  constructor(private authService: AuthService, private quizService: QuizService) { }

  ngOnInit() {
    this.authService.getLoginUser()
	      .subscribe(res => {
	        console.log(res);
	        this.loginUser = res;
	        this.user = {
		      userId: res.user.id,
		      name: res.user.name
		    };
	      }, err => {
	        console.log(err);
		  });
    this.quizService.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
  }

  getLecturesByCourseId() {
    console.log(this.courseId);
    this.authService.getPublishedLectureByCourseId(this.courseId)
      .subscribe(res => {
        console.log('lectureList', res.data);
        //this.loginUser = res;
        this.lectureList = res.data;
      }, err => {
        console.log(err);
      });
  }

  getChatHistory(){
    console.log(this.lectureId);
		this.authService.getChatHistory(this.lectureId, this.courseId)
			.subscribe(res => {
				console.log('getChatHistory', res);
				if (res.message) {
					this.messages = res.message;
				}
				console.log('getChatHistory', this.messages);

			}, err => {
				console.log(err);
			});
	}

}
