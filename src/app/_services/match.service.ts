import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url = `${environment.apiUrl}/match/`;

  constructor(private http: HttpClient) { }

  public get(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.url}/${id}`);
  }

  public create(match: Match): Observable<object> {
    return this.http.post(`${this.url}create`, match);
  }

  public update(match: Match): Observable<object> {
    return this.http.put(`${this.url}update`, match);
  }

  public delete(id: number): Observable<object> {
    return this.http.put(`${this.url}delete`, id);
  }

}
