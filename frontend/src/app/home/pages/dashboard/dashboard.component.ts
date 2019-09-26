import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { Subscription } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    userId: string;
    connectPage = true;
    subscription: Subscription;
    constructor(private http: HttpClient, private route: ActivatedRoute,
        private pagesService: PagesService, private connectionService: ConnectionService) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (!this.pagesService.user) {
            console.log(this.userId);
            this.pagesService.getUser(this.userId)
                .subscribe(user => {
                    this.pagesService.user = user.data;
                    if (user.data.connection === 'NONE') {
                        this.connectPage = true;
                    } else {
                        this.connectPage = false;
                    }
                    this.subscription = this.connectionService.getConnectionUsername()
                        .subscribe(connectionUsername => {
                            console.log(connectionUsername);
                            this.pagesService.user.connection = connectionUsername;
                        });
                }, err => {
                    console.log(err);
                });
        } else {
            if (this.pagesService.user.connection === 'NONE') {
                this.connectPage = true;
            } else {
                this.connectPage = false;
            }
        }
    }
}
