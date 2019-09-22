import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PagesService {
    user: User;

    constructor(private http: HttpClient, private router: Router) { }

    getNewUserObject(id: string, username: string, profilePicture: string) {
        this.http.get<{
            success: boolean,
            code: number,
            message: string,
            data: {
                userId: string,
                platform: string,
                params: Object
            }
        }>('http://localhost:8000/newUser/' + id)
            .pipe(map((newUser) => {
                return {
                    userId: newUser.data.userId,
                    platform: newUser.data.platform,
                    username: username,
                    params: newUser.data.params,
                    profilePicture: profilePicture,
                    connection: 'NONE',
                    inRequests: [],
                    outRequests: []
                };
            }))
            .subscribe((user) => {
                console.log(user);
                // console.log(user.inRequests);
                this.user = user;
                this.postUser();
                localStorage.setItem('userId', id);
            });
    }

    postUser() {
        this.http.post('http://localhost:8000/user/', this.user)
            .subscribe(responseData => {
                console.log(responseData);
                this.deleteNewUser(this.user.userId);
                this.router.navigate(['/home/connect']);
            }, err => {
                console.log(err);
            });
    }

    deleteNewUser(id: string) {
        this.http.delete('http://localhost:8000/newUser/' + id)
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    getUser(userId: string) {
        return this.http.get<{ data: User }>('http://localhost:8000/user/userId/' + userId);
    }
}
