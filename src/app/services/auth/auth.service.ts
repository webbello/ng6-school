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
      console.error('An error occurred:', error.error.message);
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
  	const loginUrl = `${apiUrl}/login`;
  	//console.log(loginUrl);
    return this.http.post(loginUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getLoginUser(): Observable<any>{
    const url = `${apiUrl}/loggedin`;
    //console.log(loginUrl);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
      
  }

	private setSession(authResult) {
	    const expiresAt = moment().add(authResult.expiresIn,'second');

	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
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
    this.http.get(apiUrl + '/loggedin', httpOptions).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      catchError(this.handleError));
  }

  getUserRoles(user: User): Observable<User> {
    return this.http.get(apiUrl + '/loggedin')
     .pipe(
       map(roles => {
       user = roles;
       return user;
      }));
  }


  
}
