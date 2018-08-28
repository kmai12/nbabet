import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ModalService } from '../_services/modal.service';
import { NbaService } from '../_services/nba.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  public users: User[];
  public user1: User;
  public user2: User;

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
    console.log('challengeClick:: user.email: ' + user.email);
    this.user2 = user;
    // this.user2 = this.users.filter(u => u.id === user.id)[0];

    // todo: modal match /pick your player pop up.
    this.openModal('custom-modal-1');
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
