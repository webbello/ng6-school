import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BookService } from './services/book/book.service';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared/shared.module';

import { JwtInterceptor, ErrorInterceptor } from './_interceptor';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';


// Components
import { AppComponent } from './components/index/app.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
//Material
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MaterialDashboardComponent } from './components/layout/material-dashboard/material-dashboard.component';
import { MaterialNavComponent } from './components/layout/material-nav/material-nav.component';
//Student
import { StudentAddComponent } from './components/student/add/student-add.component';
import { StudentDetailsComponent } from './components/student/details/student-details.component';
import { StudentListComponent } from './components/student/list/student-list.component';
// Faculty
import { FacultyAddComponent } from './components/faculty/add/faculty-add.component';
// Book
import { BookComponent } from './components/book/book/book.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
// Quiz
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizListComponent } from './components/quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './components/quiz/quiz-detail/quiz-detail.component';
import { QuizCreateComponent } from './components/quiz/quiz-create/quiz-create.component';
import { QuizEditComponent } from './components/quiz/quiz-edit/quiz-edit.component';
// Question
import { QuestionComponent } from './components/question/question/question.component';
import { QuestionCreateComponent } from './components/question/question-create/question-create.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';
import { QuestionEditComponent } from './components/question/question-edit/question-edit.component';
//Chat
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    MaterialDashboardComponent,
    MaterialNavComponent,
    StudentAddComponent,
    StudentDetailsComponent,
    StudentListComponent,
    FacultyAddComponent,
    BookComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent,
    QuizComponent,
    QuizListComponent,
    QuizDetailComponent,
    QuizCreateComponent,
    QuizEditComponent,
    QuestionComponent,
    QuestionCreateComponent,
    QuestionDetailComponent,
    QuestionEditComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    BookService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
