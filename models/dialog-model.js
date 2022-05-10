import pkg from 'mongoose';
const {Schema, model} = pkg;

const DialogSchema = new Schema({
    usersIds:{type:[], default:[], required:true},
    messages:{type:[], default:[]}
})

export default model("Dialog",DialogSchema);