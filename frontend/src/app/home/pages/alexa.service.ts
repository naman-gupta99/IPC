import { Injectable } from '@angular/core';
import { User } from './user.model';
import { PagesService } from './pages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AlexaService {
    user: User;
    clientId: string;
    responseType: string;
    state: string;
    redirectUri: string;
    code: string;
    constructor(private pagesService: PagesService, private http: HttpClient, private router: Router) { }

    postUser(username: string, imageUrl: string) {
        this.code = 'alexa' + Date.now();
        const user = {
            userId: this.code,
            platform: 'alexa',
            username: username,
            params: {
                userId: this.code
            },
            profilePicture: imageUrl
        };
        this.http.post('http://localhost:8000/user/', user)
            .subscribe(response => {
                window.open(this.redirectUri + '?state=' + this.state + '&code=' + this.code, '_self');
            }, err => {
                console.log(err);
            });
    }
}