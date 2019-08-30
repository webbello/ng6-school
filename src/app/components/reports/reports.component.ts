import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

import { ReportsService } from '../../services/reports/reports.service';
import { QuizService } from '../../services/quiz/quiz.service';

export interface UserData {
  id: string;
  name: string;
  total_marks: string;
  on_create: string;
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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  totalQuizResponse: [];
  courseList: any = [];
  displayedColumns: string[] = ['id', 'name', 'total_marks', 'on_create'];
  dataSource: MatTableDataSource<UserData>;
  quizDate: string;
  courseId = 'Any';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private quizService: QuizService, private reportsService: ReportsService) {
    var dt = new Date();
    this.quizDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    this.getQuizReport();
    
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.quizService.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
  }

  public getQuizReport() {
    
    //this.date = '2019-8-27';
    console.log('quizDate', this.quizDate);
    console.log('courseId', this.courseId);
    
    this.reportsService.getQuizReport(this.quizDate, this.courseId)
    .subscribe(res => {
      console.log(res);
      this.totalQuizResponse = res.reports;
      this.dataSource = new MatTableDataSource(res.reports);
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    total_marks: Math.round(Math.random() * 100).toString(),
    on_create: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
