import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import * as moment from "moment";
import { Router } from '@angular/router';
import { User } from '../../models/chat/user';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${environment.apiUrl}/users`;
const phpApiUrl = `${environment.phpApiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  public admin: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred client-side:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public postLogin(data): Observable<any> {
    //console.log(data)
  	//const loginUrl = `${apiUrl}/login`;
    const loginUrl = phpApiUrl + '/login';
  	//console.log(loginUrl);
    return this.http.post(loginUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getLoginUser(): Observable<any>{
    //const url = `${apiUrl}/loggedin`;
    const url = phpApiUrl + '/loggedin';
    //console.log(loginUrl);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
      
  }

  public setUserLastActive(status = 1): Observable<any>{
    
    //const url = `${apiUrl}/loggedin`;
    const url = phpApiUrl + '/set-user-last-active/'+ status;
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
      
  }       

	public logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    
    this.router.navigate(['/login']);
	}

	public isLoggedIn() {
    //return !!localStorage.getItem("currentUser");
	  return moment().isBefore(this.getExpiration());
	}

	public isLoggedOut() {
	    return !this.isLoggedIn();
	}

	public getExpiration() {
	    const expiration = localStorage.getItem("expires_at");
	    const expiresAt = JSON.parse(expiration);
	    return moment(expiresAt);
	}


  isAdmin(){
    var curentUser = JSON.parse( localStorage.getItem("currentUser") );
    // console.log('curentUser.admin', curentUser);
    if (curentUser) {
      return curentUser.admin;
    }
    return false;
  }

  getUserRoles(user: User): Observable<User> {
    return this.http.get(apiUrl + '/loggedin')
     .pipe(
       map(roles => {
       user = roles;
       return user;
      }));
  }

  getLiveLectureUrl(): Observable<any> {
    const url = phpApiUrl +'/live_lecture';
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getVideoLectureLogById(data): Observable<any> {
    const url = phpApiUrl +'/video-lecture-log';
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError));
  }

  rateThisSession(data): Observable<any> {
    const url = phpApiUrl +'/rate_session';
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError));
  }

  getLoginInfoFromEdusatLms(): Observable<any> {
    const url = phpApiUrl +'/hand_raise';
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  handRaise(data): Observable<any> {
    const url = phpApiUrl +'/hand_raise';
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError));
  }

  public postRate(data): Observable<any> {

    const url = phpApiUrl + '/rate_session';
  	//console.log(url);
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLastActiveUsers(): Observable<any> {
    const url = phpApiUrl +'/last-active-users';
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getLastActiveUserByCourseId(courseId): Observable<any> {
    const url = phpApiUrl +'/last-active-users/'+ courseId;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  submitAttendance(data) {
    const url = phpApiUrl + '/submit_attendance';
  	//console.log(url);
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  
}
