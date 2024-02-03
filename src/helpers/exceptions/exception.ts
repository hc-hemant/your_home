import { IExceptionError } from "./exception.interfaces";

export class Exception {

    public readonly error: IExceptionError;

    constructor(error: IExceptionError) {
        this.error = error;
    }
}