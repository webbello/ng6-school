import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Guard
import { AuthGuard } from './_guards/auth/auth.guard';
import { RoleGuard } from './_guards/role/role.guard';
// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';
import { BookService } from './services/book/book.service';

// Components
import { AppComponent } from './components/index/app.component';
import { MaterialDashboardComponent } from './components/layout/material-dashboard/material-dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
//Student
import { StudentAddComponent } from './components/student/add/student-add.component';
import { StudentDetailsComponent } from './components/student/details/student-details.component';
import { StudentListComponent } from './components/student/list/student-list.component';
// Faculty
import { FacultyAddComponent } from './components/faculty/add/faculty-add.component';
// Book
import { OfflineSessionComponent } from './components/offline-session/list/offline-session.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { OfflineSessionDetailComponent } from './components/offline-session/detail/offline-session-detail.component';
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

// Parent Routes
const routes : Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'quiz',
		component: QuizComponent
	},
	{
		path: 'dashboard',
		component: MaterialDashboardComponent
	},
	{
		path: 'quizs',
		component: QuizListComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'quiz-details/:id',
		component: QuizDetailComponent,
		data: { title: 'Quiz Details' }
	},
	{
		path: 'quiz-edit/:id',
		component: QuizEditComponent,
		data: { title: 'Quiz Edit' }
	},
	{
		path: 'quiz-create',
		component: QuizCreateComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'faculty',
		component: FacultyAddComponent
	},
	{
		path: 'student',
		component: StudentListComponent
	},
	{
		path: 'offline-session',
		component: OfflineSessionComponent,
		data: { title: 'Offline Session' }
	},
	{
		path: 'offline-session/:id',
		component: OfflineSessionDetailComponent,
		data: { title: 'Offline Session Details' }
	},
	{
		path: 'book-create',
		component: BookCreateComponent,
		data: { title: 'Create Book' }
	},
	{
		path: 'book-edit/:id',
		component: BookEditComponent,
		data: { title: 'Edit Book' }
	},
	{
		path: 'questions',
		component: QuestionComponent,
		data: { title: 'Question List' }
	},
	{
		path: 'question-details/:id',
		component: QuestionDetailComponent,
		data: { title: 'Question Details' }
	},
	{
		path: 'question-create',
		component: QuestionCreateComponent,
		canActivate: [AuthGuard],
		data: { title: 'Create Question' }
	},
	{
		path: 'question-edit/:id',
		component: QuestionEditComponent,
		data: { title: 'Edit Question' }
	},
	{
		path: 'chat',
		component: ChatComponent
	},
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes), 
  BrowserModule,
  FormsModule,
  HttpClientModule],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
