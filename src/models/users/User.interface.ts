import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    phoneNumber: string;
    password: string;
    email: string;
    lastName?: string;
}