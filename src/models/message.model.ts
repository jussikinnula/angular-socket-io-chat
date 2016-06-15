import * as mongoose from "mongoose";

export interface IMessage {
    room: string;
    created: Date;
    from: string;
    to: string;
    message: string;
}

export interface IMessageModel extends IMessage, mongoose.Document {}
 
export var MessageSchema = new mongoose.Schema({
    room: {
        type: String,
        index: true
    },
    created: Date,
    from: String,
    to: String,
    message: String
});

export var Message = mongoose.model<IMessageModel>("Message", MessageSchema);
