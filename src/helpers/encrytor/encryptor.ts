import bcrypt from 'bcrypt';

export class Encryptor {
    public static encrypt(text: string): Promise<string> {
        return bcrypt.hash(text, 12);
    }

    public static compare(text: string, compareTo: string): Promise<boolean> {
        return bcrypt.compare(text, compareTo);
    }
}