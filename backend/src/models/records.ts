import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Record = new Schema({
    appointmentId : {
        type : Number
    },
    doctor: {
        type : String
    },
    specialization: {
        type : String
    },
    patient: {
        type : String
    },
    dateTime : {
        type : Date
    },
    reasonForVisit : {
        type : String
    },
    diagnosis : {
        type : String
    },
    prescribedTherapy : {
        type : String
    },
    nextControl : {
        type : Date
    } 

})

export default mongoose.model('Record', Record, 'records');