import { Component } from '@angular/core';

import { UserService } from '../core';
import { IRoom } from '../../models';

@Component({
  selector: 'rooms',
  styleUrls: ['./rooms.component.scss'],
  templateUrl: './rooms.component.html'
})

export class RoomsComponent {
  constructor(public userService: UserService) {}
}
