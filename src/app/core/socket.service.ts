import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { IMessage } from '../../models';

export class SocketService {
  private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  socket: SocketIOClient.Socket;

  constructor(private name: string) {
    let socketUrl = this.host + '/' + this.name;
    this.socket = io.connect(socketUrl);
  }

  // Get items observable
  items(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('item', (item: any) => observer.next(item));
    });
  }

  // Request initial list when connected
  list(): void {
    this.socket.emit('list');
  }


  // Create signal
  create(params: any) {
    this.socket.emit('create', params);
  }

  // Remove signal
  remove(params: any) {
    this.socket.emit('remove', params);
  }

  onConnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('connect', () => observer.complete());
    })
  }

  onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => observer.complete());
    })
  }
}
