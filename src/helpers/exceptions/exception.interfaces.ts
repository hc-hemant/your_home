import { ErrorCode } from "./exception.enums";

export interface IExceptionError {
    error?: ErrorCode;
    message: string;
}