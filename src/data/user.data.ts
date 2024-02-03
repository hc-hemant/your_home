import UserModel from "../models/users/User.model";
import { IUser } from "../models/users/User.interface";

export class UserData {

    findUserByUsername(username: string): Promise<IUser | null> {
        return UserModel.findOne({ username }).exec();
    }

    async addUser(userDetails: IUser): Promise<IUser> {
        const userModel = new UserModel(userDetails);
        return userModel.save();
    }

    async updateUser(userDetails: IUser) {
        await UserModel.updateOne({ username: userDetails.username }, userDetails).exec();
    }
}