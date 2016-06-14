import { Component } from "@angular/core";

import { RoomComponent } from "../room";

import { UserService } from "../../services";

import { IRoom } from "../../../models/room.model";

declare var require;
const styles: string = require("./rooms.component.scss");
const template: string = require("./rooms.component.html");

@Component({
    selector: "rooms",
    directives: [
        RoomComponent
    ],
    styles: [styles],
    template
})

export class RoomsComponent {
    /**
     * Constructor.
     *
     * @class RoomsComponent
     * @constructor
     * @param userService UserService
     */
    constructor(public userService: UserService) {}
}
