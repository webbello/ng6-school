import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';

import { ReportsService } from '../../services/reports/reports.service';
import { QuizService } from '../../services/quiz/quiz.service';

export interface UserData {
  id: string;
  name: string;
  total_marks: string;
  on_create: string;
}

export interface DialogData {
  course_id: string;
  date: string;
  name: string;
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
  templateUrl: './reports-mongo.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  totalQuizResponse: [];
  courseList: any = [];
  displayedColumns: string[] = ['id', 'name', 'total_marks', 'on_create'];
  dataSource: MatTableDataSource<UserData>;
  quizDate: string;
  courseId = 'Any';
  name: string;

  //chart data
  quiz: any = [];
  quizResults: any = [];
  numToChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  chart: any = [];
  canvasId: any;
  type: any;
  labels: any = [];
  label: any;
  datasets: any = {'label': '', 'data': [], 'backgroundColor': [], 'correctAnswer': []};
  data: any = {'labels': [],'datasets': [this.datasets], 'type': ''};
  backgroundColor: any = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
  ];
  borderColor: any = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private quizService: QuizService, private reportsService: ReportsService, public dialog: MatDialog) {
    var dt = new Date();
    this.quizDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    //this.getQuizReport();
    this.getQuizReportFromMongo();
    console.log('this.date',this.date)
    
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.quizService.getCourses()
      .subscribe(res => {
        //console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
  }
  myFilter = (d: Date): boolean => {
    let dt = new Date();
    // Prevent Saturday and Sunday from being selected.
    return d <= dt ;
  }

  openFilterDialog(): void {
    
    const dialogRef = this.dialog.open(ReportsFilterDialog, {
      data: {name: this.name, course_id: this.courseId, date: this.quizDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if ( result !== undefined) {

        this.courseId = result.course_id;
        this.quizDate = result.date;
        this.name = result.name;
      
        this.getQuizReportFromMongo();
      }
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.quizDate = event.value.getFullYear() + "-" + (event.value.getMonth() + 1) + "-" + event.value.getDate();
    //this.getQuizReport();
    this.getQuizReportFromMongo();
    //console.log(`self: ${this.quizDate}`);
    //console.log(`${type}: ${event.value}`);
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
  public getQuizReportFromMongo() {
    
    //this.date = '2019-8-27';
    console.log('quizDate', this.quizDate);
    console.log('courseId', this.courseId);
    //this.getQuizDetails('5d8073e410ef3e0f64d24547');
    this.reportsService.getQuizReportFromMongo(this.quizDate, this.courseId)
    .subscribe(res => {
      console.log('getQuizReportFromMongo',res);
      // const groupBy = key => array =>
      //   array.reduce((objectsByKeyValue, obj) => {
      //     const value = obj[key];
      //     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      //     return objectsByKeyValue;
      //   }, {});
      // const groupByCourseId = groupBy('course_id');
      // this.quizResults.push(groupByCourseId(res));
      // // this.quizResults = groupByCourseId(res);

      // console.log('quizResults', this.quizResults[0]);
      // // this.quizResults[0].forEach((items, indexes) => {
      // //   console.log('quizResults inside', items);
      // // });
      
      // //this.quizResults = res;
      this.totalQuizResponse = res;
      this.dataSource = new MatTableDataSource(res);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.prepareChart(res);
    }, err => {
      console.log(err);
    });
  }
  public prepareChart(quizResults) {
    let labelsChart = [];
    let dataChart = [];
    let qOption = [];
    //console.log('quizResults inside', quizResults)
    quizResults.forEach((items, indexes) => {

      items.questions.forEach((question, qi) => {
          if (typeof dataChart[qi] === 'undefined') {
          labelsChart[qi] = [];
          dataChart[qi] = [];
          qOption[qi] = [];
          }
          question.options.forEach((item, index) => {

          labelsChart[qi][index] = this.numToChar[index];
          qOption[qi][index] = item.name;
          // Index of correct Answer
          if(item.isAnswer){
              labelsChart[qi][index] = [this.numToChar[index], 'Correct'];
          }

          if (dataChart[qi][index] == null){
              dataChart[qi][index] = 0;
          }

          if(item.selected){
              dataChart[qi][index] += 1;
          }
          });
          
          this.getChart(question.id, 'bar', labelsChart[qi], question.name, dataChart[qi], qOption[qi], quizResults.length);

      });
      //console.log('Question Option', qOption);

      //console.log('i = ', dataChart)
    })
  }
  public getChart(canvasId, type, labels, label, data, qOption, numOfStudent) {
    //console.log('labels', labels);
    
    this.chart = new Chart(canvasId, {
        type: type,
        data: {
            labels: labels,
            qOption: qOption,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          scales: {
            
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Participant: '+ numOfStudent
              },
              ticks: {
                  //min: 0,
                  beginAtZero:true,
                  // forces step size to be 5 units
                  //stepSize: 2
              }
            }]
          },
          tooltips: {
          mode: 'index',
          callbacks: {
            // Use the footer callback to display the sum of the items showing in the tooltip
            title: function(tooltipItem, data) {
              
                var label = data.qOption[tooltipItem[0].index] || '';
                return label
            }
          },
          footerFontStyle: 'normal'
        },
        }
    });
    //console.log('labelsChart[qi]', this.chart)
    
  }
  getQuizDetails(id) {
    this.quizService.getQuiz(id)
      .subscribe(data => {
        console.log('items.quiz_id data', data)
        this.quiz = data;
        //console.log('this.quiz',this.quiz);
      });

  }

  applyFilter(filterValue: string) {
    console.log(this.dataSource.filter)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


@Component({
  selector: 'reports-filter-dialog',
  templateUrl: 'reports-filter-dialog.html',
})
export class ReportsFilterDialog {
  courseList: any = [];
  quizDate: string;
  date = new FormControl(new Date());
  constructor(
    public dialogRef: MatDialogRef<ReportsFilterDialog>, private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.quizService.getCourses()
      .subscribe(res => {
        console.log(res.courses);
        this.courseList = res.courses;
      }, err => {
        console.log(err);
      });
      var dt = new Date();
      this.quizDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.quizDate = event.value.getFullYear() + "-" + (event.value.getMonth() + 1) + "-" + event.value.getDate();
    console.log(this.quizDate)
    //this.getQuizReportFromMongo();
    //console.log(`self: ${this.quizDate}`);
    //console.log(`${type}: ${event.value}`);
  }

}
