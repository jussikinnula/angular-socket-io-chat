import { Component } from "@angular/core";

import { UserService } from "../shared";
import { IRoom } from "../../models";

declare var require;
const styles: string = require("./rooms.component.scss");
const template: string = require("./rooms.component.html");

@Component({
    selector: "rooms",
    styles: [styles],
    template
})

export class RoomsComponent {
    constructor(public userService: UserService) {}
}
