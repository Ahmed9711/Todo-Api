import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    } ,
    age: Number,
    password: String,
    isLoggedIn: Boolean
},{
    timestamps: true
})

const userModel = model("User",userSchema);
export default userModel;