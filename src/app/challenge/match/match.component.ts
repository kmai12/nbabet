import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Match } from '../../models/match';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from '../../_services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  form: FormGroup;
  match: Match;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user1: ['', Validators.required],
      user2: ['', Validators.required],
      player1: ['', Validators.required],
      player2: ['', Validators.required],
      bet1: ['', Validators.required],
      bet2: ['', Validators.required],
      state1: ['', Validators.required],
      state2: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  updateMatch(match): void {
    this.match = match;

    this.form.patchValue({user1: this.match.user1, user2: this.match.user2,
      player1: this.match.player1, player2: this.match.player2,
      bet1: 0, bet2: 0,
      state1: this.match.state1, state2: this.match.state2});
  }

  onSubmit() {

    let state1 = '';
    let state2 = '';
    state1 = 'Proposed';
    state2 = 'Challenged';

    this.form.patchValue({user1: this.match.user1, user2: this.match.user2, player1: this.match.player1, player2: this.match.player2, state1: state1, state2: state2});
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.matchService.create(this.form.value).subscribe();
    // todo: close modal.
  }

  onPlayerSelected1(player: any[]): void {
    this.match.player1 = player; // also without this, setting player1 to null doesn't update playercomponent's selected player for some reason.
  }

  onPlayerSelected2(player: any[]): void {
    this.match.player2 = player;
  }

}
