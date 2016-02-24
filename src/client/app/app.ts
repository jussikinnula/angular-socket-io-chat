import { Component, View } from "angular2/core";
import { CORE_DIRECTIVES} from "angular2/common";
import * as io from "socket.io-client";

const styles: string = require("./app.scss");
const template: string = require("./app.html");

@Component({
    selector: "app"
})

@View({
    directives: [
        CORE_DIRECTIVES
    ],
    styles: [styles],
    template
})

export class App {
    socket: any;
    connected: boolean = false;
    nickname: string = "user-" + Math.floor((Math.random() * 1000) + 1);;
    message: string = "";
    items: string[] = [];

    constructor() {}

    connect() {
        this.socket = io(window.location.hostname);
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
