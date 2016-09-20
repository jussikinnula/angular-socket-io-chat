import { Injectable } from "@angular/core";

import { IRoom } from "../../models";

@Injectable()
export class UserService {
    nickname: string = "";
    rooms: IRoom[] = [];

    constructor() {}
}