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
