import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// export class RegisterComponent implements OnInit {
export class RegisterComponent {

  model: User = new User(1, 'Aqib', 'Malik', 'am@gmail.com', 0);

  submitted; boolean = false;

  // constructor() { }
  // ngOnInit() {
  // }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
