import { IRoom, Room } from "../models/room.model";
import { IMessage, Message } from "../models/message.model";

import { MessageSocket } from "./message-socket";

export class RoomSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;
    rooms: any = {};

    /**
     * Constructor.
     *
     * @class RoomSocket
     * @constructor
     * @param io any
     */
    constructor(private io: any) {
        this.nsp = this.io.of("/room");
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected");
            this.socket = socket;
            this.listen();
        });
    }

    /**
     * Add signal
     *
     * @class RoomSocket
     * @method listen
     * @return void
     */
    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("create", (name: string) => this.create(name));
        this.socket.on("remove", (name: string) => this.remove(name));
        this.socket.on("list", () => this.list());
    }

    /**
     * Handle disconnect
     *
     * @class RoomSocket
     * @method disconnect
     * @return void
     */
    private disconnect(): void {
        console.log("Client disconnected");
    }

    /**
     * Create room and emit it
     *
     * @class RoomSocket
     * @method createRoom
     * @param room IRoom
     * @return void
     */
    private createRoom(room: IRoom): void {
        if (!this.rooms[room.name]) {
            console.log("Creating namespace for room:", room.name);
            this.rooms[room.name] = new MessageSocket(this.io, room.name);
        }
        this.nsp.emit("create", room);        
    }

    /**
     * Create a room
     *
     * @class RoomSocket
     * @method create
     * @param name string
     * @return void
     */
    private create(name: string): void {
        Room.create({
            name: name,
            created: new Date(),
            messages: []
        }, (error: any, room: IRoom) => {
            if (!error && room) {
                this.createRoom(room);
            }
        });
    }

    /**
     * Remove a room
     *
     * @class RoomSocket
     * @method remove
     * @param name string
     * @return void
     */
    private remove(name: string): void {
        // First remove room messages
        Message.remove({
            room: name
        }).exec();

        // Remove room
        Room.remove({
            name: name
        }).exec( (error: any, room: IRoom) => {
            if (!error && room) {
                this.nsp.emit("remove", room);
            }
        });
    }

    /**
     * List all rooms
     *
     * @class ControlSocket
     * @method list
     * @return void
     */
    private list(): void {
        if (this.socket && this.socket.connected) {
            Room.find({}).exec( (error: any, rooms: IRoom[]) => {
                for (let room of rooms) {
                    this.createRoom(room);
                }
            });
        }
    }
}