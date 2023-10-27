import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Notification = new Schema({
    reciever : {
        type : String
    },
    notification: {
        type : String
    },
    dateTime : {
        type : Date
    },
    isRead : {
        type : Boolean
    }

})

export default mongoose.model('Notification', Notification, 'notifications');