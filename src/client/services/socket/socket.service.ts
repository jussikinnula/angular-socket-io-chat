import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { ISocketItem } from "./socket-item.interface";
import { IMessage } from "../../../models/message.model";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    /**
     * Constructor.
     *
     * @class SocketService
     * @constructor
     */
    constructor() {}

     /**
      * Get items observable
      *
      * @class SocketService
      * @method get
      * @param name string
      * @return Observable<any>
      */
    get(name: string): Observable<any> {
        this.name = name;
        this.socket = io.connect(this.host + "/" + this.name);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}"`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
            this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
            return () => this.socket.close();
        });
    }

    /**
     * Create signal
     *
     * @class SocketService
     * @method create
     * @param name string
     * @return void
     */
    create(name: string) {
        this.socket.emit("create", name);
    }

    /**
     * Remove signal
     *
     * @class SocketService
     * @method remove
     * @param name string
     * @return void
     */
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    /**
     * Handle connection opening
     *
     * @class SocketService
     * @method connect
     * @return void
     */
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    /**
     * Handle connection closing
     *
     * @class SocketService
     * @method disconnect
     * @return void
     */
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
