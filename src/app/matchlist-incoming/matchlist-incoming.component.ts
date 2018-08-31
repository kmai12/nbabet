import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchComponent } from '../challenge/match/match.component';
import { User } from '../models/user';
import { Match } from '../models/match';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-matchlist-incoming',
  templateUrl: './matchlist-incoming.component.html',
  styleUrls: ['./matchlist-incoming.component.css']
})
export class MatchlistIncomingComponent implements OnInit {
  @ViewChild(MatchComponent)
  private matchComponent: MatchComponent;

  user: User;
  matches: Match[];

  constructor(
    private matchService: MatchService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUser;

    this.matchService.getAllByUserId(this.user.id).subscribe(
     m => {
       this.matches = m[1];
     });
  }

  acceptMatch(match: Match): void {
    match.state2 = 'Accepted';
    this.matchService.update(match).subscribe();
    this.matchService.processMatch(match.id).subscribe();
  }

  declineMatch(match: Match): void {
    match.state2 = 'Denied';
    match.results.viewed = true;
    this.matchService.update(match).subscribe();
  }

  viewMatch(match: Match): void {
    this.matchComponent.updateMatch(match);
    this.openModal('custom-modal-2');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
