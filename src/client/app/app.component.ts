import { Component } from "@angular/core";

import { ControlComponent, NicknameComponent, RoomsComponent } from "../components";

import { RoomService, UserService } from "../services";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./app.component.html");

@Component({
    selector: "app",
    styles: [styles],
    directives: [
        ControlComponent,
        NicknameComponent,
        RoomsComponent
    ],
    providers: [
        RoomService
    ],
    template
})

export class AppComponent {
    /**
     * Constructor.
     *
     * @class AppComponent
     * @constructor
     * @param userService UserService
     */
    constructor(public userService: UserService) {}
}
