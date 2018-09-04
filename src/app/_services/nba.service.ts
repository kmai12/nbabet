import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private url = `${environment.apiUrl}/api/nba`;

  constructor(private http: HttpClient) { }

  public getTeam(teamName: string): Observable<any> {
    return this.http.get(`${this.url}/teams/${teamName}.json`);
  }

  // public getTeam(teamName: string): any {
  //   let team = null;
  //   this.http.get(`./assets/stats/teams/${teamName}.json`).subscribe(
  //     t => {
  //       console.log(t);
  //       team = t;
  //       this.GetPlayersFromTeam(team);
  //       return team;
  //     }
  //   );
  // }

  private GetPlayersFromTeam(team: any): any {
    let i = 0;
    for (const player of team.resultSets[0].rowSet) {

      console.log(i + ' ' + player[3] + ' ' + player[12]);
      i++;
    }

  }

  public getPlayers(teamName: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams().append('team', teamName) };
    return this.http.get(`${this.url}/teams`, httpOptions);
  }

  public getPlayerGameLog(player: any[]): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams().append('teamid', player[0]).append('playerid', player[12]) };
    return this.http.get(`${this.url}/players`, httpOptions);
  }
}
