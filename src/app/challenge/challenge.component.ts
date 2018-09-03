import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ModalService } from '../_services/modal.service';
import { NbaService } from '../_services/nba.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Match } from '../models/match';
import { MatchComponent } from './match/match.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  @ViewChild(MatchComponent)
  private matchComponent: MatchComponent;

  public users: User[];
  public user1: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private nbaService: NbaService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.user1 = this.authenticationService.currentUser;
  }

  getUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  challenge(user: User): void {
    const match: Match = new Match(0, this.user1, user, null, [], 0, 0, 'Proposed', 'Challenged', null);
    this.matchComponent.updateMatch(match);
    this.openModal('custom-modal-1');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
