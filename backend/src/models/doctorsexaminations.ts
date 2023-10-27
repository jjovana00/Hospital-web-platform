import mongoose from "mongoose";

const Schema = mongoose.Schema;

let DoctorsExaminations = new Schema({
    doctor: {
        type : String
    },
    examination: {
        type : Array
    }
})

export default mongoose.model('DoctorsExaminations', DoctorsExaminations, 'doctorsExaminations');