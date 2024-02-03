import { Exception } from "./exception";
import { HttpStatusCode } from "./exception.enums";
import { IExceptionError } from "./exception.interfaces";

export class HttpException extends Exception {
    public readonly status: HttpStatusCode;

    constructor(status: HttpStatusCode, error: IExceptionError) {
        super(error);
        this.status = status;
    }
}