import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { MessageService, RoomService, UserService, SocketService } from "../../services";

import { OrderByPipe } from "../../pipes";

import { IRoom } from "../../../models/room.model";
import { IMessage } from "../../../models/message.model";

declare var require;
const styles: string = require('./room.component.scss');
const template: string = require('./room.component.html');

@Component({
    selector: 'room',
    directives: [],
    styles: [styles],
    pipes: [
        OrderByPipe
    ],
    template
})

export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;
    @Input() room: IRoom;
    message: string = "";
    messages: IMessage[];
    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    /**
     * Constructor.
     *
     * @class RoomComponent
     * @constructor
     * @param roomService RoomService
     * @param userService UserService
     * @param socketService SocketService
     */
    constructor(
        private roomService: RoomService,
        public userService: UserService,
        public socketService: SocketService
    ) {}

    /**
     * Handle keypress event, for saving nickname
     *
     * @class RoomComponent
     * @method eventHandler
     * @return void
     */
    ngOnInit(): void {
        this.messageService = new MessageService(this.room.name);
        this.messageService.messages.subscribe(messages => {
            this.messages = messages;
            setTimeout( () => {
                this.scrollToBottom();
            }, 200);
        });
        this.messageService.create(this.userService.nickname, "joined the channel");
    }

    /**
     * After view initialized, focus on chat message text input
     *
     * @class RoomComponent
     * @method ngAfterViewInit
     * @return void
     */
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    /**
     * When component is destroyed, ensure that leave message is sent
     *
     * @class RoomComponent
     * @method ngOnDestroy
     * @return void
     */
    ngOnDestroy(): void {
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    }

    /**
     * Send chat message, and reset message text input
     *
     * @class RoomComponent
     * @method send
     * @return void
     */
    send(): void {
        this.messageService.create(this.userService.nickname, this.message);
        this.message = "";
    }

    /**
     * Leave room gracefully
     *
     * @class RoomComponent
     * @method leave
     * @return void
     */
    leave(): void {
        this.alreadyLeftChannel = true;
        this.messageService.create(this.userService.nickname, "left the channel");
        this.roomService.leave(this.room.name);
    }

    /**
     * Scroll to bottom (this is called when new message is received)
     *
     * @class RoomComponent
     * @method eventHandler
     * @return void
     */
    scrollToBottom(): void {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch(error) {
            console.log("ERROR:", error);
        }                 
    }

    /**
     * Handle keypress event, for sending chat message
     *
     * @class RoomComponent
     * @method eventHandler
     * @return void
     */
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.send();
        }
    }
}
