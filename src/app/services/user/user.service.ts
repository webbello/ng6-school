import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

//const apiUrl = "/book";
//const apiUrl = environment.apiUrl;
const apiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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

  postLogin(data): Observable<any> {
  	const loginUrl = `${apiUrl}/login`;
  	//console.log(loginUrl);
    return this.http.post(loginUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postSignup(data): Observable<any> {
    const signupUrl = `${apiUrl}/signup`;
    console.log(signupUrl);
    return this.http.post(signupUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
}
