import { Request } from "express";
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

    async signInUser(email: string, password: string): Promise<UserResponseModel | HttpException> {
        const user = await this.userController.findUser(email);
        if (user && (<IUser>user).password) {
            const userDetails = user as IUser;
            return this.authService.signInUser(userDetails, password);
        } else {
            return user as HttpException;
        }
    }

    async signUpUser(req: Request): Promise<UserResponseModel | HttpException> {
        try {
            
            const userInfo = req.body as IUser;
                
            if (!userInfo.firstName || !userInfo.email || !userInfo.phoneNumber || !userInfo.password) {
                return new HttpException(HttpStatusCode.BAD_REQUEST, {
                    message: "Mandatory feilds missing."
                });
            }
            const existingUser = await this.userController.findUser(userInfo.email) as IUser;
    
            if (existingUser && existingUser.email) {
                return new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
                    error: ErrorCode.DUPLICATE_ENTITY,
                    message: "User already exist."
                });
            }
    
            return this.authService.signUpUser(userInfo);
        } catch (err) {
            console.log('err', err);
            return new HttpException(HttpStatusCode.BAD_REQUEST, {
                message: "Mandatory feilds missing."
            });
        }
    }
}