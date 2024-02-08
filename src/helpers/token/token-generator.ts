import jwt from 'jsonwebtoken';

export class TokenGenerator {

    static readonly privateKey = "jaimatadijaishreeram";

    public static generate(payload: { firstName: string, email: string }): string {
        return jwt.sign(payload, TokenGenerator.privateKey);
    }

    public static decode(token: string): string | { [key: string]: string } | null {
        return jwt.decode(token);
    }


}