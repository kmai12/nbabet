import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchComponent } from '../challenge/match/match.component';
import { User } from '../models/user';
import { Match } from '../models/match';
import { MatchService } from '../_services/match.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {
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
       this.matches = m[0].filter(m2 => m2.results.viewed1 === true)
        .concat(m[1].filter( m2 => m2.results.viewed2 === true ));
     });
  }

  viewMatch(match: Match): void {
    match.results.viewed1 = true;
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
