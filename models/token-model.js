import pkg from 'mongoose';
const { Schema, model } = pkg;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, default: false, ref: "User"},
    refreshToken: {type: String, required: true}
})

export default model("Token", TokenSchema);