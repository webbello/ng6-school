import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/chat/user';
import { QuizChatModel } from '../../../models/chat/quiz';
import { QuizResultModel } from '../../../models/socket/quiz';
import { ChatService } from '../../../services/chat.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  quiz: any = [];
  start: boolean = false;
  user: User;
  onlineUsers: [];
  ioConnection: any;
  quizResults: any = [];
  resultsTable: any = [];
  
  constructor(private route: ActivatedRoute, private authService: AuthService, private api: QuizService, private chatService: ChatService, private router: Router) { 

  }

  ngOnInit() {
    
    this.authService.getLoginUser()
      .subscribe(res => {
        //console.log(res);
        this.user = {
        //id: randomId,
        userId: res.user.id,
        name: res.user.name,
        email: res.user.email
      };
      }, err => {
        console.log(err);
      });
    this.getQuizDetails(this.route.snapshot.params['id']);
    this.getLastActiveUserByCourseId(this.quiz.courseId);

    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.initIoConnection();
    }

  }
  private initIoConnection(): void {
     
    this.ioConnection = this.chatService.onQuizSubmit()
      .subscribe((quizResult: QuizResultModel) => {
        console.log('quizResult', quizResult);
        //console.log('this.user',this.user);
        // exclude sender from game
        if (quizResult.from.userId != this.user.userId) {
          this.quizResults.push(quizResult);
          this.resultsTable.push(createNewUser(quizResult));
        }
    
        this.dataSource = new MatTableDataSource(this.resultsTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log('quizResults', this.resultsTable);
        
      });
      
  }
  public getLastActiveUserByCourseId(courseId) {
    this.authService.getLastActiveUserByCourseId(courseId)
    .subscribe(res => {
      //console.log('last_active within 3 minute', res.last_active);
      this.onlineUsers = res.last_active;
    }, err => {
      console.log(err);
    });
  }
  getQuizDetails(id) {
    this.api.getQuiz(id)
      .subscribe(data => {
        console.log(data);
        this.quiz = data;
        //console.log('this.quiz',this.quiz);
      });

  }
  /**
   * [startQuiz description]
   * @param {string}  quizId [description]
   * @param {boolean} start  [description]
   */
  public startQuiz(courseId: number, quizId: string, start: boolean): void {
    //console.log(courseId);
      if (!quizId) {
        return;
      }
      this.start = start;
      this.chatService.startQuiz({
        id: quizId,
        courseId: courseId,
        from: this.user,
        start: this.start,
        duration: this.quiz.duration,
        created_at: new Date(),
      });
      console.log('this.quiz.duration', this.quiz.duration)
      setTimeout(()=> {
        //this.mode = 'result';
        this.start = false;
        //this.router.navigate(["/quiz"]);
      }, this.quiz.duration * 1000);

      this.api.updateQuiz(quizId, {last_played: new Date()})
      .subscribe(res => {
        if (!res.errors) {
          let id = res['_id'];
          this.quiz.last_played = new Date();
          console.log('id', id);
        }
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteQuiz(id) {
    this.api.deleteQuiz(id)
      .subscribe(res => {
          this.router.navigate(['/quizs']);
        }, (err) => {
          console.log(err);
        }
      );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewUser(quizResult): UserData {

  return {
    id: quizResult.id.toString(),
    name: quizResult.from.name,
    progress: quizResult.correctAnswerCount,
    color: quizResult.created_at
  };
}