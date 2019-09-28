import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { Subscription } from 'rxjs';
import { ConnectionService } from '../connection.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    userId: string;
    connectPage = true;
    subscription: Subscription;
    connectionSubscription: Subscription;
    requestSubsricption: Subscription;
    constructor(private http: HttpClient, private route: ActivatedRoute,
        private pagesService: PagesService, private connectionService: ConnectionService,
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (!this.pagesService.user) {
            console.log(this.userId);
            this.pagesService.getUser(this.userId)
                .subscribe(user => {
                    this.pagesService.user = user.data;
                    this.subscription = this.connectionService.getConnectionUsername(this.pagesService.user.username)
                        .subscribe(connectionUsername => {
                            if (this.connectionService.requestConnection === 0) {
                                this.pagesService.user.inRequests.push(connectionUsername);
                                if (this.pagesService.connectPage !== true) {
                                    this.pagesService.updateConnection(true);
                                }
                            } else if (this.connectionService.requestConnection === 1) {
                                console.log(connectionUsername);
                                this.pagesService.user.connection = connectionUsername;
                                if (this.pagesService.connectPage !== false) {
                                    this.pagesService.updateConnection(false);
                                }
                            } else {
                                this.pagesService.user.connection = 'NONE';
                                this.pagesService.user.inRequests.pop();
                                this.pagesService.updateConnection(true);
                            }
                        });
                    this.connectionSubscription = this.pagesService.getConnectionStatus()
                        .subscribe(response => {
                            console.log(response);
                            this.connectPage = response;
                        });
                    if (user.data.connection === 'NONE') {
                        if (this.pagesService.connectPage !== true) {
                            this.pagesService.updateConnection(true);
                        }
                    } else {
                        if (this.pagesService.connectPage !== false) {
                            this.pagesService.updateConnection(false);
                        }
                    }
                }, err => {
                    console.log(err);
                });
        } else {
            if (this.pagesService.user.connection === 'NONE') {
                if (this.pagesService.connectPage !== true) {
                    this.pagesService.updateConnection(true);
                }
            } else {
                if (this.pagesService.connectPage !== false) {
                    this.pagesService.updateConnection(false);
                }
            }
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.connectionSubscription.unsubscribe();
    }
}
