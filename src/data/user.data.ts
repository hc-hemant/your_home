import UserModel from "../models/users/User.model";
import { IUser } from "../models/users/User.interface";

export class UserData {

    findUserByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email }).exec();
    }

    async addUser(userDetails: IUser): Promise<IUser> {
        const userModel = new UserModel(userDetails);
        return userModel.save();
    }

    async updateUser(userDetails: IUser) {
        await UserModel.updateOne({ email: userDetails.email }, userDetails).exec();
    }
}