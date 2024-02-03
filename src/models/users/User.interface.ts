import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    username: string;
    phoneNumber: string;
    password: string;
    email: string;
    lastName?: string;
    imageUrl?: string;
    deviceToken: Array<string>;
}