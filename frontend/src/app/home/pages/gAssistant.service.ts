import { Injectable } from '@angular/core';
import { User } from './user.model';
import { PagesService } from './pages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GAssistantService {
    user: User;
    clientId: string;
    responseType: string;
    state: string;
    redirectUri: string;
    code: string;
    constructor(private pagesService: PagesService, private http: HttpClient, private router: Router) { }

    postUser(username: string, imageUrl: string) {
        this.code = 'gassistant' + Date.now();
        const user = {
            userId: this.code,
            platform: 'gassistant',
            username: username,
            params: {
                userId: this.code
            },
            profilePicture: imageUrl
        };
        this.http.post('http://localhost:8000/user/', user)
            .subscribe(response => {
                window.open(this.redirectUri + '?code=' + this.code + '&state=' + this.state, '_self');
            }, err => {
                console.log(err);
            });
    }
}
