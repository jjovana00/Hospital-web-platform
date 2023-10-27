import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Appointment = new Schema({
    id : {
        type : Number
    },
    doctor: {
        type : String
    },
    patient: {
        type : String
    },
    examName: {
        type : String
    },
    dateTime : {
        type : Date
    },
    duration : {
        type : Number
    },
    department : {
        type : String
    },
    hasReview : {
        type : Boolean
    } 

})

export default mongoose.model('Appointment', Appointment, 'appointments');