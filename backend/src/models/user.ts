import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type : String
    },
    lastname: {
        type : String
    },
    username: {
        type : String
    },
    password: {
        type : String
    },
    email : {
        type : String
    },
    adress: {
        type : String
    },
    telephone: {
        type : String
    },
    type: {
        type : Number
    },
    approved: {
        type : Number
    },
    specialization : {
        type : String
    },
    department : {
        type : String
    },
    licenceNum : {
        type : Number
    },
    img : {
        type : String
    }
})

export default mongoose.model('User', User, 'users');