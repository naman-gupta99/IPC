import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { PagesService } from '../pages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-connect-page',
    templateUrl: './connect-page.component.html',
    styleUrls: ['./connect-page.component.scss']
})
export class ConnectPageComponent implements OnInit {
    searchContent: string;
    users = [];
    isRequested = false;
    currentUser: string;
    disable = false;
    userId: string;
    constructor(private http: HttpClient, private pagesService: PagesService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (!this.pagesService.user) {
            console.log(this.userId);
            this.pagesService.getUser(this.userId)
                .subscribe(user => {
                    this.pagesService.user = user.data;
                    this.currentUser = user.data.username;
                    this.getUserNames();
                }, err => {
                    console.log(err);
                });
        } else {
            console.log(this.pagesService.user);
            this.currentUser = this.pagesService.user.username;
            this.getUserNames();
        }
    }

    getUserNames() {
        this.http.get<{
            success: boolean,
            code: number,
            message: string,
            data: [{
                username: string,
            }]
        }>('http://localhost:8000/user/usernames')
            .subscribe(responseData => {
                for (const i of responseData.data) {
                    this.users.push({ username: i.username });
                }
                console.log(this.users);
            });
    }

    alreadyRequested(user: string) {
        if (this.pagesService.user.inRequests.includes(user)) {
            this.isRequested = true;
            if (this.pagesService.user.outRequests.includes(user)) {
                console.log('true');
                this.disable = true;
            }
            return false;
        }
        this.isRequested = false;
        return true;
    }

    sendRequest(inUsername: string) {
        if (!this.pagesService.user.outRequests.includes(inUsername)) {
            const postData = {
                outUsername: this.pagesService.user.username,
                inUsername: inUsername
            };
            this.http.post('http://localhost:8000/user/request', postData)
                .subscribe(response => {
                    console.log(response);
                }, err => {
                    console.log(err);
                });
        }
    }

    acceptRequest() {

    }
}
