import { Component, ViewEncapsulation } from '@angular/core';

import { UserService } from './core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(public userService: UserService) {}
}
