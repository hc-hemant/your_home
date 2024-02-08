import { Request, Response, NextFunction } from "express"
import { UserData } from "../data/user.data";
import { TokenGenerator } from "../helpers/token/token-generator";


export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userData = new UserData();
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) return res.status(403).send();
    const decodedToken = TokenGenerator.decode(token as string);
    if (!decodedToken) return res.status(403).send();
    const email = (<{ [key: string]: string }>decodedToken)["email"];
    userData.findUserByEmail(email).then(value => {
        if (!value) {
            return res.status(403).send();
        } else {
            req.body.user = value;
            next();
        }
    });
}