import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './alexa-connect-page.component.html',
    styleUrls: ['./alexa-connect-page.component.scss']
})
export class AlexaConnectPageComponent implements OnInit {
    imageUrl: any = 'http://i.pravatar.cc/500?img=7';
    connectForm: FormGroup;
    userName: string;
    constructor(private pagesService: PagesService, private router: Router) { }

    ngOnInit() {
        this.connectForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.maxLength(20)])
        });
    }

    onSubmit() {
        this.userName = this.connectForm.controls.username.value;
        this.pagesService.getUserByUsername(this.userName)
            .subscribe(response => {
                this.pagesService.user = response.data;
                this.router.navigate(['/home/dashboard/' + this.pagesService.user.userId]);
            }, err => {
                console.log(err);
            });
    }
}
