import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService, ISocketItem } from "../socket";
import { UserService } from "../user";

import { IRoom } from "../../../models/room.model";

@Injectable()
export class RoomService {
    rooms: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    /**
     * Constructor.
     *
     * @class RoomService
     * @constructor
     * @param socketService SocketService
     * @param userService UserService
     */
    constructor(
        private socketService: SocketService,
        private userService: UserService
    ) {
        this.socketService
            .get("room")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let room: IRoom = socketItem.item;
                    let index: number = this.findIndex(room.name);
                    if (socketItem.action === "remove") {
                        // Remove
                        this.list = this.list.delete(index);
                    } else {
                        if (index === -1) {
                            // Create
                            this.list = this.list.push(room);
                        } else {
                            // Update
                            this.list = this.list.set(index, room)
                        }
                    }
                    this.rooms.next(this.list);
                },
                error => console.log(error)
            );
    }

    /**
     * Join room
     *
     * @class RoomService
     * @method join
     * @param name string
     * @return void
     */
    join(name: string): void {
        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
            if (room.name === name) {
                return;
            }
        }
        let index = this.findIndex(name);
        if (index !== -1) {
            let room = this.list.get(index);
            this.userService.rooms.push(room);
        }
    }

    /**
     * Leave room
     *
     * @class RoomService
     * @method leave
     * @param name string
     * @return void
     */
    leave(name: string) {
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }
    }

    /**
     * Create room
     *
     * @class RoomService
     * @method create
     * @param name string
     * @return void
     */
    create(name: string) {
        this.socketService.create(name);
    }

    /**
     * Remove room
     *
     * @class RoomService
     * @method remove
     * @param name string
     * @return void
     */
    remove(name: string) {
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }

        // Send signal to remove the room
        this.socketService.remove(name);
    }

    /**
     * Find matching room
     *
     * @class RoomService
     * @method findIndex
     * @param name string
     * @return number
     */
    private findIndex(name: string): number {
        return this.list.findIndex((room: IRoom) => {
            return room.name === name;
        });
    }
}