import { PropertyData } from "../data/property.data";
import { IProperty } from "../models/property/Property.interface";
import { IGetAllPropertyRequestParams, IGetAllPropertyResponse } from "../types/interfaces/property.interfaces";
import { DEFAULT_PAGE_SIZE } from "../constants/constants";

export class PropertyController {

    propertyDB: PropertyData;

    constructor() {
        this.propertyDB = new PropertyData();
    }

    async addProperty(images: Array<any>, propertyInfo: IProperty) {
        const imageUrls = images.map(image => {
            return image.path;
        });

        propertyInfo.images = imageUrls;
        return this.propertyDB.addProperty(propertyInfo);
    }

    async getAll(params: IGetAllPropertyRequestParams, query?: { [key: string]: string }): Promise<IGetAllPropertyResponse> {

        const limit = params.limit !== undefined ? parseInt(params.limit) : DEFAULT_PAGE_SIZE;
        const skip = params.skip !== undefined ? parseInt(params.skip) : 0;
        const filters: { [key: string]: string | number | Array<any> | object } = {};
        const sort = params.sort ? params.sort : 'societyName';
        const order = params.order ? this.getSortIndex(params.order) : 1;

        if (params.search) {
            const regex = new RegExp(params.search, 'i');
            filters["societyName"] = { $regex: regex };
        }
        return this.propertyDB.getAllProperty(filters, limit, skip, sort, order);
    }

    private getSortIndex(sort: string): number {
        return sort.toUpperCase() === "DESC" ? -1 : 1;
    }
}