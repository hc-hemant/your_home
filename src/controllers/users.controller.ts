import { Request } from "express";
import { UserData } from "../data/user.data";
import { IExceptionError } from "../helpers/exceptions/exception.interfaces";
import { IUser } from "../models/users/User.interface";
import { HttpException } from "../helpers/exceptions/http.exception";
import { ErrorCode, HttpStatusCode } from "../helpers/exceptions/exception.enums";

export class UserController {
    userDB: UserData;

    constructor() {
        this.userDB = new UserData();
    }

    async findUser(username: string): Promise<IUser | HttpException> {
        const user = await this.userDB.findUserByUsername(username);
        if (!user) {
            return new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
                error: ErrorCode.NOT_EXIST,
                message: "Incorrect username.username does not exist."
            })
        }
        return user;
    }

    async createUser(userDetails: IUser): Promise<IUser> {
        return this.userDB.addUser(userDetails);
    }

    async updateUser(userDetails: IUser) {
        return this.userDB.updateUser(userDetails);
    }


}