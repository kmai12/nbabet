import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../models/match';
import { User } from '../models/user';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-matchlist',
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css']
})
export class MatchlistComponent implements OnInit {
  user: User;
  matches: Match[];
  challenges: Match[];
  challengers: Match[];

  constructor(
    private matchService: MatchService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUser;

    this.matchService.getAllByUserId(this.user.id).subscribe(
     m => {
       this.matches = [].concat.apply([], m);
       this.challenges = m[0];
       this.challengers = m[1];
       console.log(m);
       console.log(this.matches);
     });
  }

}
