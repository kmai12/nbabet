import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public selectedPlayer: string;
  public users: string[];

  constructor(
  ) { }

  ngOnInit() {
    this.users = ['ABCDE', 'Johnathan', 'PoolBCD', 'Chromeo', 'JoBromeo', 'ABCDUDE', 'XYZMAN', 'VatoWoman', 'MikeHunt'];
  }

  onSelect(player: string): void {
    this.selectedPlayer = player;
  }
}
