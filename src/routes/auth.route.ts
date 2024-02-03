import express, { Request } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { HttpStatusCode } from '../helpers/exceptions/exception.enums';
import { HttpException } from '../helpers/exceptions/http.exception';

const router = express.Router();

const authController = new AuthController();

router.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const deviceToken = req.body.deviceToken;

    if (username && password) {
        authController.signInUser(username, password, deviceToken).then(user => {
            res.status(200).send(user);
        });
    } else {
        res.status(404).send(new HttpException
            (
                HttpStatusCode.BAD_REQUEST,
                {
                    message: 'username and password are required'
                }
            )
        );
    }
});

router.post('/signup', (req, res) => {

    authController.signUpUser(req).then(user => {
        res.status(200).send(user);
    }).catch(error => {
        res.status(500).send();
    });
});

export default router;