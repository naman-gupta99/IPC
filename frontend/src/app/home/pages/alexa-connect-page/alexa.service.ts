import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { PagesService } from '../pages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AlexaService {
    user: User;
    clientId: string;
    responseType: string;
    state: string;
    redirectUri: string;
    code = 'alexa123';
    constructor(private pagesService: PagesService, private http: HttpClient, private router: Router) { }

    postUser(username: string) {
        const user = {
            userId: 'alexa123',
            platform: 'alexa',
            username: username,
            params: {},
            profilePicture: ''
        };
        window.open(this.redirectUri + '?state=' + this.state + '&code=' + this.code);
    }


}
