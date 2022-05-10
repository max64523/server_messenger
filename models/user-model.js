import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    dialogs : {type: [], default:[]}
})

export default model("User", UserSchema);