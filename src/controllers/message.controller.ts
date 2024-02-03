import { IUser } from "../models/users/User.interface";
import { UserController } from "./users.controller";
import MessageSender from "../helpers/message/message.sender";

export default class MessageController {

    userController: UserController;
    messageSender: MessageSender;

    constructor() {
        this.userController = new UserController();
        this.messageSender = new MessageSender();
    }

    async sendMessageToUser(to: string, message: string, from: string, date: string): Promise<any> {
        const messageReciever = await this.userController.findUser(to) as IUser;
        const sender = await this.userController.findUser(from) as IUser;

        if (messageReciever && messageReciever.deviceToken && messageReciever.deviceToken.length) {
            return this.messageSender.sendMessageToMultipleReciever(messageReciever.deviceToken, message, `${sender.firstName} ${sender.lastName}`, date);
        }
    }
}