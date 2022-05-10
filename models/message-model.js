import pkg from 'mongoose';
const {Schema, model} = pkg;

const MesageSchema = new Schema({
    userId:{type:String, default:"", required:true},
    message:{type:String, default:""}
})

export default model("Message",DialogSchema);