import { Component } from "@angular/core";

import { UserService, RoomService } from "../../services";

import { IRoom } from "../../../models/room.model";

declare var require;
const styles: string = require("./control.component.scss");
const template: string = require("./control.component.html");

@Component({
    selector: "control",
    directives: [],
    styles: [styles],
    template
})

export class ControlComponent {
    room: string = "";
    newRoom: string = "";

    /**
     * Constructor.
     *
     * @class ControlComponent
     * @constructor
     * @param roomService RoomService
     */
    constructor(public roomService: RoomService) {}

    /**
     * Join room, when Join-button is pressed
     *
     * @class ControlComponent
     * @method join
     * @return void
     */
    join(): void {
        this.roomService.join(this.room);
    }

    /**
     * Create room, when Create-button is pressed and empty newRoom text input
     *
     * @class ControlComponent
     * @method create
     * @return void
     */
    create(): void {
        this.roomService.create(this.newRoom);
        this.newRoom = "";
    }

    /**
     * Remove room, when Remove-button is pressed and unset selected room
     *
     * @class ControlComponent
     * @method remove
     * @return void
     */
    remove(): void {
        this.roomService.remove(this.room);
        this.room = "";
    }

    /**
     * Handle keypress event (for creating a new room)
     *
     * @class ControlComponent
     * @method join
     * @return void
     */
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.create();
        }
    }
}
