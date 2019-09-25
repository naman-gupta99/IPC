import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    userId: string;
    connectPage = true;
    constructor(private http: HttpClient, private route: ActivatedRoute, private pagesService: PagesService) { }

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
