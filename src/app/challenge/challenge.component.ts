import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ModalService } from '../_services/modal.service';
import { NbaService } from '../_services/nba.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  public users: User[];

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private nbaService: NbaService
  ) { }

  ngOnInit() {
    this.getUsers();
    // do list:
    const team = this.nbaService.getTeam('jazz');

    // JSON.parse();
  }

  getUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  challenge(user: User): void {
    console.log('challengeClick:: user.email: ' + user.email);
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
