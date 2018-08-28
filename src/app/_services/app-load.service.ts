import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Match } from '../models/match';

@Injectable()
export class AppLoadService {
  constructor() { }

  initializeApp(): Promise<any> {
    console.log('initializeApp()');
    return new Promise((resolve, reject) => {
      console.log('initializeApp():: inside promise.');
      setTimeout(() => {
        const users: User[] = this.generateUsers();
        if (localStorage.getItem('users') == null) {
          console.log('initializeApp():: setting users');
          localStorage.setItem('users', JSON.stringify(users));
        }

        const matches = this.generateMatches();
        if (localStorage.getItem('matches') == null) {
          localStorage.setItem('matches', JSON.stringify(matches));
        }

        resolve();
      }, 1);
    });

  }

  generateUsers(): User[] {
    const users: User[] = [];
    users.push(new User(1, 'a', 'a', 'a@a.com', '123123', 125));
    users.push(new User(2, 'b', 'b', 'b@b.com', '123123', 125));
    users.push(new User(3, 'John', 'Jacobs', 'johnjacobs@gmail.com', '123123', 125));
    users.push(new User(4, 'Apple', 'FruitPerson', 'applefruitperson@gmail.com', '123123', 125));
    users.push(new User(5, 'Jam', 'Bam', 'jambam@gmail.com', '123123', 125));
    users.push(new User(6, 'Beatle', 'The', 'beatles@gmail.com', '123123', 125));
    users.push(new User(7, 'Fruiscante', 'Tethers', 'fruiscantes@gmail.com', '123123', 125));
    users.push(new User(8, 'Descartes', 'John', 'descartes@gmail.com', '123123', 125));
    users.push(new User(9, 'Bubble', 'Bubble', 'bubbles@gmail.com', '123123', 125));
    users.push(new User(10, 'Jay', 'Rock', 'jayrock@gmail.com', '123123', 125));
    return users;
  }

  generateMatches(): Match[] {
    const matches: Match[] = [];
    return matches;
  }

}
