import { Document } from "mongoose";

export interface IProperty extends Document {
    type: string;
    description: string;
    availableFor: string;
    ameneties: Array<string>;
    societyName: string;
    price: number;
    size: number;
    city: string;
    state: string;
    pincode: string;
    images: Array<string>;
    coordinates: Array<number>;
    availableFrom: string;
    locality: string;
    username: string;
}