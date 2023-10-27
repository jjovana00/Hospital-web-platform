import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Spec = new Schema({
    name: {
        type : String
    },
    examination: {
        type : Array
    }
})

export default mongoose.model('Spec', Spec, 'specializations');