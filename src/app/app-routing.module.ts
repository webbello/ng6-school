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

// Components
import { MaterialDashboardComponent } from './components/layout/material-dashboard/material-dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { OfflineSessionComponent } from './components/offline-session/list/offline-session.component';
import { OfflineSessionDetailComponent } from './components/offline-session/detail/offline-session-detail.component';

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

import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { ReportsComponent } from './components/reports/reports.component';
//Chat
import { ChatComponent } from './components/chat/chat.component';

// Parent Routes
const routes : Routes = [
	
	{ path: '', redirectTo: '/quiz', pathMatch: 'full' },
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'quiz',
		component: QuizComponent,
		canActivate: [AuthGuard],
		data: { title: 'Play Quiz' }
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
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'quiz-edit/:id',
		component: QuizEditComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'quiz-create',
		component: QuizCreateComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'online-users',
		component: OnlineUsersComponent,
		canActivate: [AuthGuard],
		data: { title: 'Online Users' }
	},
	{
		path: 'reports',
		component: ReportsComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'offline-session',
		component: OfflineSessionComponent,
		canActivate: [AuthGuard],
		data: { title: 'Offline Session' }
	},
	{
		path: 'offline-session/:id',
		component: OfflineSessionDetailComponent,
		canActivate: [AuthGuard],
		data: { title: 'Offline Session Details' }
	},
	{
		path: 'questions',
		component: QuestionComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'question-details/:id',
		component: QuestionDetailComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'question-create',
		component: QuestionCreateComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'question-edit/:id',
		component: QuestionEditComponent,
		canActivate: [RoleGuard],
		data: { expectedRole: 'Admin' }
	},
	{
		path: 'chat',
		component: ChatComponent,
		canActivate: [AuthGuard],
		data: { title: 'Ask Question' }
	}
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes), 
  BrowserModule,
  FormsModule,
  HttpClientModule],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
