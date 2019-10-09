import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { QuizService } from '../../../services/quiz/quiz.service';
import { AuthService } from '../../../services/auth/auth.service';

export interface QuizData {
  id: string;
  name: string;
  description: string;
  course: string;
  duration: number;
  created: string;
  action: string;
}

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizs: any;
  onlineUsers: [];
  courseList: any = [];
  courseId: number;
  start: boolean = false;
  ioConnection: any;
  displayedColumns = ['course', 'name', 'description', 'duration', 'created'];
  // dataSource = new QuizDataSource(this.api);

  dataSource: MatTableDataSource<QuizData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**
   * Create an instance of QuizListComponent
   * @param {QuizService} api
   * @param {AuthService} authService
   * @memberof QuizListComponent
   */
  constructor(private api: QuizService, private authService: AuthService) { 
    this.getLastActiveUsers();
    this.api.getQuizs()
      .subscribe(res => {
        console.log(res);
        this.quizs = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });
    
  }

  ngOnInit() {
    
    this.api.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });

  }

  public getLastActiveUsers() {
    this.authService.getLastActiveUsers()
    .subscribe(res => {
      //console.log(res.last_active);
      this.onlineUsers = res.last_active;
    }, err => {
      console.log(err);
    });
  }

  getQuizByCourseId () {
    console.log('courseId',this.courseId);
    this.api.getQuizByCourseId(this.courseId)
    .subscribe(res => {
      //console.log((res));
      this.quizs = res;
      this.dataSource = new MatTableDataSource(this.quizs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
