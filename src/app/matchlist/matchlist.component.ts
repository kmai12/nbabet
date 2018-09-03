import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Match } from '../models/match';
import { User } from '../models/user';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalService } from '../_services/modal.service';
import { MatchComponent } from '../challenge/match/match.component';

@Component({
  selector: 'app-matchlist',
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css']
})
export class MatchlistComponent implements OnInit {
  @ViewChild(MatchComponent)
  private matchComponent: MatchComponent;

  user: User;
  matches: Match[];
  // challenges: Match[];
  // challengers: Match[];

  constructor(
    private matchService: MatchService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUser;

    this.matchService.getAllByUserId(this.user.id).subscribe(
     m => {
      this.matches = m[0].filter(m2 => m2.results.viewed === false);
      // this.matches = m[0];
    });
  }

  acceptMatch(match: Match): void {
    match.state2 = 'Accepted';
    this.matchService.update(match).subscribe();
    this.matchService.processMatch(match.id).subscribe();
  }

  declineMatch(match: Match): void {
    match.state2 = 'Denied';
    match.results.viewed = false;
    this.matchService.update(match).subscribe();
  }

  viewMatch(match: Match): void {
    match.results.viewed = true;
    this.matchComponent.updateMatch(match);
    this.openModal('custom-modal-2');
  }

  buttonToggle(m: Match): boolean {
    return !m.results.viewed && m.state2 === 'Accepted';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
