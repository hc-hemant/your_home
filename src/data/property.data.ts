import { IProperty } from "../models/property/Property.interface";
import propertyModel from "../models/property/property.model";
import { IGetAllPropertyResponse } from "../types/interfaces/property.interfaces";

export class PropertyData {

    async addProperty(propertyDetails: IProperty): Promise<IProperty> {
        const property = new propertyModel(propertyDetails);
        return property.save();
    }

    async getAllProperty(query: { [key: string]: any }, limit: number, skip: number, sortProperty: string, order: number): Promise<IGetAllPropertyResponse> {
        const asyncQueries: [Promise<number>, Promise<Array<IProperty>>] = [
            propertyModel.countDocuments(query).exec(),
            propertyModel.find(query).sort({ [sortProperty]: order }).skip(skip).limit(limit).exec()
        ];

        const [count, properties] = await Promise.all(asyncQueries);
        return {
            items: properties,
            limit,
            skip,
            totalItems: count
        };
    }
}