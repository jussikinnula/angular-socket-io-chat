import { Observable } from 'rxjs';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

import { IMessage, Message } from './message.model';

export interface IRoom {
  name: string;
  created: Date;
}

interface IRoomModel extends IRoom, mongoose.Document {}

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  created: Date
});

const RoomModel = mongoose.model<IRoomModel>('Room', RoomSchema);

export class Room {
  name: string;
  created: Date;

  constructor(room: IRoomModel) {
    this.name = room.name;
    this.created = moment(room.created).toDate();
  }

  public static find(name: string): Observable<Room> {
    return new Observable(observer => {
      RoomModel.findOne({ name }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
        }
        observer.complete();
      });
    });
  }

  public static create(name: string): Observable<Room> {
    return new Observable(observer => {
      const created = new Date();
      RoomModel.create({ name, created }, (error, room) => {
        if (!error && room) {
          observer.next(new Room(room));
          observer.complete();
        } else {
          observer.error(new Error());
        }
      });
    });
  }

  public static list(): Observable<Room[]> {
    return new Observable(observer => {
      RoomModel.find({}, (error, rooms) => {
        if (!error && rooms) {
          observer.next(rooms.map(room => new Room(room)));
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  remove(): Observable<any> {
    return new Observable(observer => {
      RoomModel.remove({ name: this.name }).exec();
      Message.remove(this.name).subscribe(
        x => {},
        error => observer.error(new Error(error)),
        () => observer.complete()
      );
    });
  }

  messages() {
    return Message.list(this.name);
  }
}