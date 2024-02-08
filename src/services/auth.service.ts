import { UserController } from "../controllers/users.controller";
import { Encryptor } from "../helpers/encrytor/encryptor";
import { ErrorCode, HttpStatusCode } from "../helpers/exceptions/exception.enums";
import { HttpException } from "../helpers/exceptions/http.exception";
import { TokenGenerator } from "../helpers/token/token-generator";
import { UserResponseModel } from "../models/response-models/user-response.model";
import { IUser } from "../models/users/User.interface";

export class AuthService {
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
    }

    async signInUser(userDetails: IUser, password: string): Promise<UserResponseModel | HttpException> {
        const isEqual = await Encryptor.compare(password, userDetails.password);
        if (isEqual) {
            const authToken = TokenGenerator.generate({
                firstName: userDetails.firstName,
                email: userDetails.email,
            });
        
            return new UserResponseModel(userDetails.firstName, userDetails.email, userDetails.phoneNumber, authToken, userDetails.lastName);
        } else {
            return new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
                message: "Incorrect credentails entered",
                error: ErrorCode.INVALID_CREDENTIALS
            });
        }
    }

    async signUpUser(userDetails: IUser): Promise<UserResponseModel | HttpException> {
        userDetails.password = await Encryptor.encrypt(userDetails.password);

        const newUser = await this.userController.createUser(userDetails);
        if (!newUser) {
            return new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
                message: "Some error occured."
            });
        }
        const authToken = TokenGenerator.generate({
            firstName: newUser.firstName,
            email: newUser.email,
        });
        return new UserResponseModel(newUser.firstName, newUser.email, newUser.phoneNumber, authToken, newUser.lastName);
    }
}