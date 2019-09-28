import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { GAssistantService } from '../gAssistant.service';
import { PagesService } from '../pages.service';

@Component({
    templateUrl: './gAssistant-signup-page.component.html',
    styleUrls: ['./gAssistant-signup-page.component.scss']
})
export class GAssistantSignUpPageComponent implements OnInit {
    imageUrl: any = 'http://i.pravatar.cc/500?img=7';
    signUpForm: FormGroup;
    forbiddenUsernames = [];
    userNameValid = false;
    currentUserName: string;
    id: string;
    constructor(private authService: AuthService, private route: ActivatedRoute,
        private gAssistantService: GAssistantService, private pagesService: PagesService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.gAssistantService.clientId = params['client_id'];
            this.gAssistantService.responseType = params['response_type'];
            this.gAssistantService.state = params['state'];
            this.gAssistantService.redirectUri = params['redirect_uri'];
        });

        this.signUpForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.maxLength(20)], this.validateUsername.bind(this))
        });

        if (!this.pagesService.usernames) {
            this.pagesService.getUsernames().subscribe(responseData => {
                for (const i of responseData.data) {
                    this.forbiddenUsernames.push(i.username.toLowerCase());
                    this.pagesService.usernames = this.forbiddenUsernames;
                }
            });
        } else {
            this.forbiddenUsernames = this.pagesService.usernames;
        }
    }

    validateUsername(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve) => {
            setTimeout(() => {
                this.currentUserName = control.value.toLowerCase();
                if (this.forbiddenUsernames.indexOf(this.currentUserName) !== -1) {
                    resolve({ 'forbidden': true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
        return promise;
    }

    onImageUploaded(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            this.imageUrl = reader.result;
        };
    }

    onSubmit() {
        this.signUpForm.reset();
        this.authService.addUsername(this.currentUserName);
        this.gAssistantService.postUser(this.currentUserName, this.imageUrl);
    }
}

