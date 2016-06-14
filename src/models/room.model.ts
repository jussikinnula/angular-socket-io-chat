import * as mongoose from "mongoose";

export interface IRoom {
    name: string;
    created: Date;
}

export interface IRoomModel extends IRoom, mongoose.Document {}
 
export var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    created: Date
});

export var Room = mongoose.model<IRoomModel>("Room", RoomSchema);
