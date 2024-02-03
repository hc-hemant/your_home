import { Request } from "express";
import { Encryptor } from "../helpers/encrytor/encryptor";
import { ErrorCode, HttpStatusCode } from "../helpers/exceptions/exception.enums";
import { HttpException } from "../helpers/exceptions/http.exception";
import { UserResponseModel } from "../models/response-models/user-response.model";
import { IUser } from "../models/users/User.interface";
import { AuthService } from "../services/auth.service";
import { UserController } from "./users.controller";

export class AuthController {
    private userController: UserController;
    private authService: AuthService

    constructor() {
        this.authService = new AuthService();
        this.userController = new UserController();
    }

    async signInUser(username: string, password: string, token: string): Promise<UserResponseModel | HttpException> {
        const user = await this.userController.findUser(username);
        if (user && (<IUser>user).password) {
            const userDetails = user as IUser;
            return this.authService.signInUser(userDetails, password, token);
        } else {
            return user as HttpException;
        }
    }

    async signUpUser(req: Request): Promise<UserResponseModel | HttpException> {
        const files = req.files as Array<any>;
        const userInfo: IUser = JSON.parse(req.body.userInfo);
        const imageUrl = files && files[0] && files[0].path ? files[0].path : '';
        if (!userInfo.firstName || !userInfo.email || !userInfo.username || !userInfo.phoneNumber || !userInfo.password) {
            return new HttpException(HttpStatusCode.BAD_REQUEST, {
                message: "Mandatory feilds missing."
            });
        }
        const existingUser = await this.userController.findUser(userInfo.username) as IUser;
        if (existingUser && existingUser.username) {
            return new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
                error: ErrorCode.DUPLICATE_ENTITY,
                message: "User already exist."
            });
        }
        if (imageUrl) userInfo.imageUrl = imageUrl;
        return this.authService.signUpUser(userInfo);
    }
}