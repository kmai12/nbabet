import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';


// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

}
