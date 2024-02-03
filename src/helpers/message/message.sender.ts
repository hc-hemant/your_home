import { Sender, Message } from 'node-gcm';
import { FIREBASE_SERVER_KEY } from '../../constants/constants';

export default class MessageSender {

    sender: Sender;

    constructor() {
        this.sender = new Sender(FIREBASE_SERVER_KEY);
    }

    sendMessageToMultipleReciever(deviceTokens: Array<string>, messageTxt: string, from: string, date: string): Promise<any> {
        const message = new Message(
            {
                notification: {
                    title: "Visit Request by " + from + " on " + date,
                    body: messageTxt,
                    icon: "ic_launcher",
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                },
                restrictedPackageName: "com.example.YOUR_HOME",
                data: {
                    body: messageTxt,
                    date: date
                }
            }
        );
        return new Promise((resolve, reject) => {
            this.sender.sendNoRetry(message, deviceTokens, (err, res) => {
                if (!err) {
                    resolve(undefined);
                } else {
                    reject(err);
                }
            });
        });

    }
}