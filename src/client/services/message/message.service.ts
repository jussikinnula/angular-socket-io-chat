import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService, ISocketItem } from "../socket";

import { IMessage } from "../../../models/message.model";

export class MessageService {
    messages: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();
    private socketService: SocketService;

    /**
     * Constructor.
     *
     * @class MessageService
     * @constructor
     * @param room string
     */
    constructor(private room: string) {
        this.socketService = new SocketService();
        this.socketService
            .get("messages/" + this.room)
            .subscribe(
                (socketItem: ISocketItem) => {
                    let message: IMessage = socketItem.item;
                    this.list = this.list.push(message);
                    this.messages.next(this.list);
                },
                error => console.log(error)
            );
    }

    /**
     * Emit message using socket service
     *
     * @class MessageService
     * @method create
     * @param from string
     * @param message string
     * @return void
     */
    create(from: string, message: string): void {
        this.socketService.socket.emit("create", {
            room: this.room,
            created: new Date(),
            from: from,
            to: "",
            message: message
        });
    }
}