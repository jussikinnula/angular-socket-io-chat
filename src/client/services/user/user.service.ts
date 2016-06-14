import { Injectable } from "@angular/core";

import { IRoom } from "../../../models/room.model";

@Injectable()
export class UserService {
    nickname: string = "";
    rooms: IRoom[] = [];

    /**
     * Constructor.
     *
     * @class UserService
     * @constructor
     */
    constructor() {}
}