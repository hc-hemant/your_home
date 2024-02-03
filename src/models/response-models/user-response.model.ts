export class UserResponseModel {
    public readonly firstName: string;
    public readonly username: string;
    public readonly email: string;
    public readonly phoneNumber: string;
    public readonly token: string;
    public readonly imageUrl?: string;
    public readonly lastName?: string;

    constructor(username: string, firstName: string, email: string, phoneNumber: string, token: string, lastName?: string, imageUrl?: string,) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.imageUrl = imageUrl;
        this.phoneNumber = phoneNumber;
        this.token = token;
    }
}