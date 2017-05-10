import { Observable } from 'rxjs';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

import { Room } from './room.model';

export interface IMessage {
  room: string;
  created: Date;
  from: string;
  to: string;
  message: string;
}

interface IMessageModel extends IMessage, mongoose.Document {}

const MessageSchema = new mongoose.Schema({
  room: {
    type: String,
    index: true
  },
  created: Date,
  from: String,
  to: String,
  message: String
});

const MessageModel = mongoose.model<IMessageModel>('Message', MessageSchema);

export class Message {
  room: string;
  created: Date;
  from: string;
  to: string;
  message: string;

  constructor(message: IMessageModel) {
    this.room = message.room;
    this.created = moment(message.created).toDate();
    this.from = message.from;
    this.to = message.to;
    this.message = message.message;
  }

  public static create(message: IMessage): Observable<Message> {
    return new Observable(observer => {
      Room.find(message.room).subscribe(
        room => {
          message.created = new Date();
          MessageModel.create(message, (error, message) => {
            if (!error && message) {
              observer.next(new Message(message));
            }
            observer.complete();
          });
         },
         error => observer.error(new Error())
       );
    });
  }

  public static list(room: string): Observable<Message[]> {
    return new Observable(observer => {
      MessageModel.find({ room }, (error, messages) => {
        if (!error && messages) {
          observer.next(messages.map(message => new Message(message)));
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  public static remove(room: string): Observable<Message[]> {
    return new Observable(observer => {
      MessageModel.remove({ room }, (error) => {
        if (!error) {
          observer.complete();
        } else {
          observer.error(new Error(error));
        }
      });
    });
  }
}