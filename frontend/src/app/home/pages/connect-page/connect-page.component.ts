import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesService } from '../pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Component({
    selector: 'app-connect-page',
    templateUrl: './connect-page.component.html',
    styleUrls: ['./connect-page.component.scss']
})
export class ConnectPageComponent implements OnInit {
    searchContent = '';
    userNames = [];
    isRequested = false;
    currentUser: string;
    disable = false;
    userId: string;
    imgSrc = 'http://i.pravatar.cc/500?img=7';
    requestSubscription: Subscription;
    constructor(private http: HttpClient, private pagesService: PagesService,
        private route: ActivatedRoute, private router: Router, private connectionService: ConnectionService) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (!this.pagesService.user) {
            console.log(this.userId);
            this.pagesService.getUser(this.userId)
                .subscribe(user => {
                    this.pagesService.user = user.data;
                    this.currentUser = user.data.username;
                    if (!this.pagesService.usernames) {
                        this.getUserNames();
                    }
                }, err => {
                    console.log(err);
                });
        } else {
            console.log(this.pagesService.user);
            this.currentUser = this.pagesService.user.username;
            console.log(this.pagesService.usernames);
            if (!this.pagesService.usernames) {
                this.getUserNames();
            } else {
                this.userNames = this.pagesService.usernames;
            }
        }
    }

    getUserNames() {
        this.pagesService.getUsernames()
            .subscribe(responseData => {
                for (const i of responseData.data) {
                    this.userNames.push(i.username.toLowerCase());
                    this.pagesService.usernames = this.userNames;
                }
                console.log(this.userNames);
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
                    this.pagesService.user.outRequests.push(inUsername);
                }, err => {
                    console.log(err);
                });
        }
    }

    acceptRequest(outUsername: string) {
        this.pagesService.connectToUser(outUsername)
            .subscribe(response => {
                console.log(response);
                this.pagesService.user.connection = outUsername;
                if (this.pagesService.connectPage !== false) {
                    this.pagesService.updateConnection(false);
                }
            }, err => {
                console.log(err);
            });
    }
}
