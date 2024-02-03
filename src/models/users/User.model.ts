import mongoose, { Schema } from "mongoose";
import { IUser } from "./User.interface";

const UserSchema: Schema = new Schema({
    username: { type: Schema.Types.String, required: true, unique: true },
    firstName: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    phoneNumber: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String },
    imageUrl: { type: Schema.Types.String },
    deviceToken: { type: Schema.Types.Array, of: Schema.Types.String, required: true }
})


export default mongoose.model<IUser>('Users', UserSchema);