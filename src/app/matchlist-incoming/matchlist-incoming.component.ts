import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchComponent } from '../challenge/match/match.component';
import { User } from '../models/user';
import { Match } from '../models/match';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalService } from '../_services/modal.service';
import { map } from 'rxjs/operators';

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
       this.matches = m[1].filter(
         m2 => m2.results.viewed2 === false);
     });
  }

  acceptMatch(match: Match): void {
    match.state2 = 'Accepted';
    let test = null;
    // this.matchService.processMatch(match.id).subscribe();
    this.matchService.processMatch(match.id).subscribe(r => {
        test = r;
        console.log(r);
    });
    // this.matchService.update(match).subscribe();
  }

  declineMatch(match: Match): void {
    match.state2 = 'Denied';
    match.results.viewed2 = true;
    this.matchService.update(match).subscribe();
  }

  viewMatch(match: Match): void {
    match.results.viewed2 = true;
    this.matchService.update(match).subscribe();
    this.openModal('custom-modal-2');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
