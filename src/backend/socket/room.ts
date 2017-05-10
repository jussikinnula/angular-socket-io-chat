import { Room, Message } from '../../models';
import { MessageSocket } from './message';

export class RoomSocket {
  nsp: any;
  name: string;
  data: any;
  socket: any;
  rooms: Room[] = [];
  messageSockets: MessageSocket[] = [];

  constructor(private io: any) {
    this.nsp = this.io.of('/room');
    this.nsp.on('connection', (socket: any) => {
      console.log('Client connected');
      this.socket = socket;
      this.updateMessageSockets();
      this.listen();
    });
  }

  // Add signal
  private listen(): void {
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('create', (name: string) => this.create(name));
    this.socket.on('remove', (name: string) => this.remove(name));
    this.socket.on('list', () => this.list());
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }

  // Create a room
  private create(name: string): void {
    Room.create(name).subscribe(
      room => this.list(),
      error => console.error('Room creation failed', error)
    );
  }

  // Remove a room
  private remove(name: string): void {
    Room.find(name).subscribe(
      room => room.remove().subscribe(x => {}, e => {}, () => this.list()),
      error => console.error('Room removal failed', error)
    );
  }

  // List all rooms
  private list(): void {
    Room.list().subscribe(rooms => {
      this.rooms = rooms;
      this.updateMessageSockets();
      this.nsp.emit('item', rooms);
    });
  }

  // Update message sockets
  private updateMessageSockets(): void {
    // Add message sockets for new rooms
    let validRooms = {};
    for (const room of this.rooms) {
      validRooms[room.name] = true;
      const matches = this.messageSockets.filter(messageSocket => messageSocket.room.name === room.name);
      if (matches.length == 0) {
        console.log('creating new namespace for', room.name);
        this.messageSockets.push(new MessageSocket(this.io, room));
      }
    }

    // Destroy sockets for removed rooms
    for (const index in this.messageSockets) {
      const messageSocket = this.messageSockets[index];
      if (!validRooms[messageSocket.room.name]) {
        this.messageSockets.splice(parseInt(index, 10), 1);
      }
    }
  }
}