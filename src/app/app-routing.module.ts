import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';
import { BookService } from './services/book/book.service';

// Components
import { AppComponent } from './components/index/app.component';
import { StudentAddComponent } from './components/student/add/student-add.component';
import { StudentDetailsComponent } from './components/student/details/student-details.component';
import { StudentListComponent } from './components/student/list/student-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { FacultyAddComponent } from './components/faculty/add/faculty-add.component';
import { BookComponent } from './components/book/book/book.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';

import { QuestionComponent } from './components/question/question/question.component';
import { QuestionCreateComponent } from './components/question/question-create/question-create.component';
import { QuestionDetailComponent } from './components/question/question-detail/question-detail.component';
import { QuestionEditComponent } from './components/question/question-edit/question-edit.component';
import { AuthGuard } from './_guards/auth/auth.guard';
// Parent Routes
const routes : Routes = [
	// {
	// 	path: '',
	// 	component: HomeComponent,
	// 	children :homeChildRoutes,
	// 	canActivate : [AuthService]
	// },
	{
		path: 'login',
		component: LoginComponent
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
	path: 'books',
		component: BookComponent,
		data: { title: 'Book List' }
	},
	{
		path: 'book-details/:id',
		component: BookDetailComponent,
		data: { title: 'Book Details' }
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
	}
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
