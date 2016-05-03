import { Component } from "@angular/core";
import { CORE_DIRECTIVES} from "@angular/common";
import * as io from "socket.io-client";

declare var require;
const styles: string = require("./app.component.scss");
const template: string = require("./app.component.html");

@Component({
    selector: "app",
    styles: [styles],
    template
})

export class AppComponent {
    socket: any;
    connected: boolean = false;
    nickname: string = "user-" + Math.floor((Math.random() * 1000) + 1);;
    message: string = "";
    items: string[] = [];

    constructor() {}

    connect() {
        this.socket = io(window.location.href);
        console.log(window.location);
        this.socket.on("connect", () => {
            this.socket.emit("register", this.nickname);
            this.connected = true;
        });
        this.socket.on("message", item => {
            this.items.push(item);
        });
        this.socket.on("disconnect", () => {
            this.connected = false;
            // Just don"t try to reconnected, when connection was interrupted
            this.socket.disconnect();
        });
    }

    disconnect() {
        this.connected = false;
        this.socket.disconnect();
    }

    send() {
        console.log("Trying to send message", this.nickname, this.message);
        this.socket.emit("message", "<" + this.nickname + "> " +  this.message);
    }
}
