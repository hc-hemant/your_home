export interface IGetAllPropertyRequestParams {
    limit?: string;
    skip?: string;
    nextCursor?: string;
    search?: string;
    sort?: string;
    order?: string;
}

export interface IGetAllPropertyResponse {
    items: Array<any>;
    totalItems?: number;
    limit?: number;
    skip?: number;
    nextCursor?: string;
}