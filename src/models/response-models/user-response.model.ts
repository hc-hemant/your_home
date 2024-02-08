export class UserResponseModel {
    public readonly firstName: string;
    public readonly email: string;
    public readonly phoneNumber: string;
    public readonly token: string;
    public readonly lastName?: string;

    constructor(firstName: string, email: string, phoneNumber: string, token: string, lastName?: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.token = token;
    }
}