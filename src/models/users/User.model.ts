import mongoose, { Schema } from "mongoose";
import { IUser } from "./User.interface";

const UserSchema: Schema = new Schema({
    firstName: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    phoneNumber: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String }
})


export default mongoose.model<IUser>('Users', UserSchema);