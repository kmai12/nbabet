import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbaService } from '../_services/nba.service';
import { User } from '../models/user';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() user: User;
  @Output() playerSelect = new EventEmitter<any[]>();

  public teams: any[];
  public players: any[];
  public selectedPlayer: any[];
  public selectedTeam: string;

  constructor(
    private nbaService: NbaService
  ) { }

  ngOnInit() {
    this.nbaService.getPlayers('jazz').subscribe(
      t => {
        // console.log(t);
        this.players = t.resultSets[0].rowSet;
      });
  }

  onSelect(player: any[]): void {
    this.playerSelect.emit(player);
    this.selectedPlayer = player;
  }
}
