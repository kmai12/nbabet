import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Match } from '../../models/match';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  form: FormGroup;
  @Input() user1: User;
  @Input() user2: User;
  player1: any[];
  player2: any[];

  match: Match;

  constructor(
    private formBuilder: FormBuilder
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

    // this.match = new Match(0, this.user1, this.user2, null, null, 50, 50, 'Proposed', 'Challenged');
  }

  get f() { return this.form.controls; }

  onSubmit() {

    let state1 = '';
    let state2 = '';
    state1 = 'Proposed';
    state2 = 'Challenged';

    this.form.patchValue({user1: this.user1, user2: this.user2, player1: this.player1, player2: this.player2, state1: state1, state2: state2});
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    // todo: backend match service.
    // this.matchService.create(this.form.value);
  }

  onPlayerSelected1(player: any[]): void {
    this.player1 = player;
  }

  onPlayerSelected2(player: any[]): void {
    this.player2 = player;
  }

}
