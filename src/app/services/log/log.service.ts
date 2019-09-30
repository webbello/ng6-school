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
const apiUrl = `${environment.apiUrl}/log`;
const phpApiUrl = `${environment.phpApiUrl}/log`;

@Injectable({
  providedIn: 'root'
})
export class LogService {

  /**
   *Create an instance of LogService
   * @param {HttpClient} http
   * @memberof LogService
   */
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    // if (error instanceof HttpErrorResponse) {
    //   console.log('hii');
    //   if (error.status === 401) {
    //     console.log('hi');
    //     this.router.navigate(['/login']);
    //   }
    // }

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
  
  getQuizLogs(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /* Post Quiz Log */
  postQuizLog(data): Observable<any> {
    //console.log(data);
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* Post Quiz Log in php url */
  postQuizApiPhpLog(data): Observable<any> {
    //console.log(data);
    return this.http.post(phpApiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getQuizLog(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateQuizLog(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteQuizLog(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
