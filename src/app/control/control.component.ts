import { Component } from '@angular/core';

import { RoomService } from '../core';
import { IRoom } from '../../models';

@Component({
  selector: 'control',
  styleUrls: ['./control.component.scss'],
  templateUrl: './control.component.html'
})

export class ControlComponent {
  room: string = '';
  newRoom: string = '';

  constructor(public roomService: RoomService) {}

  // Join room, when Join-button is pressed
  join(): void {
    this.roomService.join(this.room);
  }

  // Create room, when Create-button is pressed and empty newRoom text input
  create(): void {
    this.roomService.create(this.newRoom);
    this.newRoom = '';
  }

  // Remove room, when Remove-button is pressed and unset selected room
  remove(): void {
    this.roomService.remove(this.room);
    this.room = '';
  }

  // Handle keypress event (for creating a new room)
  eventHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.create();
    }
  }
}
