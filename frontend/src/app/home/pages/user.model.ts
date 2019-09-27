export interface User {
    userId: string;
    platform: string;
    username: string;
    params: Object;
    profilePicture: string;
    connection: string;
    inRequests: string[];
    outRequests: string[];
}
