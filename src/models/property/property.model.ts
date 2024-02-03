import mongoose, { Schema } from "mongoose";
import { IProperty } from "./Property.interface";

const PropertySchema: Schema = new Schema({
    type: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    availableFor: { type: Schema.Types.String, required: true },
    ameneties: { type: Schema.Types.Array, of: Schema.Types.String, required: true },
    societyName: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    size: { type: Schema.Types.Number, required: true },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    pincode: { type: Schema.Types.String, required: true },
    images: { type: Schema.Types.Array, of: Schema.Types.String },
    coordinates: { type: Schema.Types.Array, of: Schema.Types.Number },
    availableFrom: { type: Schema.Types.String, required: true },
    locality: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true }
});


export default mongoose.model<IProperty>('Properties', PropertySchema);