import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models';
import * as moment from "moment";

import { environment } from '../../../environments/environment';


const apiUrl = `${environment.apiUrl}/users`;
const phpApiUrl = `${environment.phpApiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public admin: boolean = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  public login(username: string, password: string) {
    const loginUrl = phpApiUrl + '/login';
    return this.http.post<any>(loginUrl, { username, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            const expiresAt = moment().utcOffset("+05:30").add(user.expiresIn,'hours');
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('id_token', user.token);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
            this.currentUserSubject.next(user);
          }

          return user;
      }));
  }

	public logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
	    
	}

	
  
}
