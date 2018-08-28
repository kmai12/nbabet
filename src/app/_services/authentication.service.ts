import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get currentUser(): User {
    if (this.isLoggedIn) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }

    return null;
  }

  get isLoggedIn() {
    this.loggedIn.next(localStorage.getItem('currentUser') != null);
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    this.loggedIn.next(false);
  }
}
