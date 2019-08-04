export class AuthService {
    userNameTaken = [];

    addUsername(userName: string) {
        this.userNameTaken.push(userName);
    }

    getUsernames() {
        return this.userNameTaken.slice();
    }
}
