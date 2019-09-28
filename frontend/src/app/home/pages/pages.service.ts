import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable()
export class PagesService {
    user: User;
    usernames: string[];
    connectPage = true;
    connectPageChange = new Subject<boolean>();
    observer = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router) {
    }

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
                this.user = user;
                this.postUser();
            });
    }

    postUser() {
        this.http.post('http://localhost:8000/user/', this.user)
            .subscribe(responseData => {
                console.log(responseData);
                this.deleteNewUser(this.user.userId);
                this.router.navigate(['/home/dashboard', this.user.userId]);
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

    getUserByUsername(userName: string) {
        return this.http.get<{ data: User }>('http://localhost:8000/user/username/' + userName);
    }

    getUsernames() {
        return this.http.get<{
            success: boolean,
            code: number,
            message: string,
            data: [{
                username: string,
            }]
        }>('http://localhost:8000/user/usernames');
    }

    connectToUser(outUsername: string) {
        return this.http.post('http://localhost:8000/user/connect', { outUsername: outUsername, inUsername: this.user.username });
    }

    disconnectUser() {
        this.http.post(
            'http://localhost:8000/user/disconnect',
            {
                username1: this.user.username,
                username2: this.user.connection
            })
            .subscribe(response => {
                console.log(response);
                this.connectPage = true;
                this.updateConnection(true);
            }, err => {
                console.log(err);
            });
    }

    getObserver() {
        return this.observer;
    }

    updateConnection(val: boolean) {
        this.connectPage = val;
        this.observer.next(val);
    }

    getConnectionStatus() {
        return this.observer.asObservable();
    }
}
