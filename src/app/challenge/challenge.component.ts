import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  // public users: User[];
  public users: string[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
    // this.users = ['ABCDE', 'Johnathan', 'PoolBCD', 'Chromeo', 'JoBromeo', 'ABCDUDE', 'XYZMAN', 'VatoWoman', 'MikeHunt'];
  }

  getUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users.map(u => u.email));
  }

}
