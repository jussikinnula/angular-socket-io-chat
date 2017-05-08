import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { RoomService } from './room.service';
import { SocketService } from './socket.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    RoomService,
    SocketService,
    UserService
  ]
})
export class CoreModule {}
