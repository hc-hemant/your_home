import express, { Request } from 'express';

import MessageController from '../controllers/message.controller';

const router = express.Router();

const messageController: MessageController = new MessageController();

router.post('/user', async (req, res) => {
    const { to, message, date } = req.body;

    const from = req.body.user.username;
    if (to && message && from) {
        const messageRes = await messageController.sendMessageToUser(to, message, from, date);
        if (messageRes) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    } else {
        res.status(400).send();
    }
});


export default router;