import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    events: Array
},{versionKey: false})

const User = mongoose.model('user', userSchema)
export default User
