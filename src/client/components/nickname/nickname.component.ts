import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../../services";

declare var require;
const styles: string = require('./nickname.component.scss');
const template: string = require('./nickname.component.html');

@Component({
    selector: 'nickname',
    directives: [],
    styles: [styles],
    template
})

export class NicknameComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;

    /**
     * Constructor.
     *
     * @class NicknameComponent
     * @constructor
     * @param userService UserService
     */
    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
    }

    /**
     * After view initialised, focus on nickname text input
     *
     * @class NicknameComponent
     * @method ngAfterViewInit
     * @return void
     */
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    /**
     * Save nickname to user store
     *
     * @class NicknameComponent
     * @method save
     * @return void
     */
    save(): void {
        this.userService.nickname = this.nickname;
    }

    /**
     * Handle keypress event, for saving nickname
     *
     * @class NicknameComponent
     * @method eventHandler
     * @return void
     */
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
