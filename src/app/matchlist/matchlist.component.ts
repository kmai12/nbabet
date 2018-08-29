import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../models/match';
import { User } from '../models/user';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-matchlist',
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css']
})
export class MatchlistComponent implements OnInit {
  user: User;
  currentMatch: Match;
  matches: Match[];
  challenges: Match[];
  challengers: Match[];

  constructor(
    private matchService: MatchService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
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

  viewMatch(match: Match): void {
    // this.user2 = user;
    this.currentMatch = match;
    // todo: use child control method to update controls q/ new match values.
    this.openModal('custom-modal-2');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
