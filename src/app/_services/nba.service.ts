import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  constructor(private http: HttpClient) { }

  public getTeam(teamName: string): any {
    let team = null;
    this.http.get(`./assets/stats/teams/${teamName}.json`).subscribe(
      t => {
        console.log(t);
        team = t;
        this.GetPlayersFromTeam(team);
        return team;
      }
    );
  }

  private GetPlayersFromTeam(team: any): any {
    let i = 0;
    for (const player of team.resultSets[0].rowSet) {

      console.log(i + ' ' + player[3] + ' ' + player[12]);
      i++;
    }

  }

  public getPlayersFromTeam(): void {
  }
}
