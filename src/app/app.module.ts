import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTreeModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatFormFieldModule} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { BookService } from './services/book/book.service';


//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';

// Components
import { AppComponent } from './components/index/app.component';
import { StudentAddComponent } from './components/student/add/student-add.component';
import { StudentDetailsComponent } from './components/student/details/student-details.component';
import { StudentListComponent } from './components/student/list/student-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FacultyAddComponent } from './components/faculty/add/faculty-add.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { MaterialDashboardComponent } from './components/layout/material-dashboard/material-dashboard.component';
import { MaterialNavComponent } from './components/layout/material-nav/material-nav.component';
import { BookComponent } from './components/book/book/book.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentAddComponent,
    StudentDetailsComponent,
    StudentListComponent,
    LoginComponent,
    HomeComponent,
    FacultyAddComponent,
    SidebarComponent,
    MaterialDashboardComponent,
    MaterialNavComponent,
    BookComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
