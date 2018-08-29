import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ModalService } from '../_services/modal.service';
import { NbaService } from '../_services/nba.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  public users: User[];
  public currentMatch: Match;
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
    this.currentMatch = new Match(0, this.user1, user, null, null, 0, 0, '', '');
    // todo: use child control method to update controls q/ new match values.
    this.openModal('custom-modal-1');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
