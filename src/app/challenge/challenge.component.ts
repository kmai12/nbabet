import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  public users: User[];
  private bodyText: string;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.getUsers();
    // this.users = ['ABCDE', 'Johnathan', 'PoolBCD', 'Chromeo', 'JoBromeo', 'ABCDUDE', 'XYZMAN', 'VatoWoman', 'MikeHunt'];
    this.bodyText = 'This text can be updated in modal 1';
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
