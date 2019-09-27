import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlexaService } from '../alexa.service';

@Component({
    templateUrl: './alexa-signup-page.component.html',
    styleUrls: ['./alexa-signup-page.component.scss']
})
export class AlexaSignUpPageComponent implements OnInit {
    imageUrl: any = 'http://i.pravatar.cc/500?img=7';
    signUpForm: FormGroup;
    forbiddenUsernames = [];
    userNameValid = false;
    currentUserName: string;
    id: string;
    constructor(private authService: AuthService, private route: ActivatedRoute, private alexaService: AlexaService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.alexaService.clientId = params['client_id'];
            this.alexaService.responseType = params['response_type'];
            this.alexaService.state = params['state'];
            this.alexaService.redirectUri = params['redirect_uri'];
        });

        this.signUpForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.maxLength(20)], this.validateUsername.bind(this))
        });
    }

    validateUsername(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve) => {
            setTimeout(() => {
                // call server and query for entered username in database
                this.forbiddenUsernames = this.authService.getUsernames();
                this.currentUserName = control.value;
                if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
                    resolve({ 'forbidden': true });
                } else {
                    resolve(null);
                }
            }, 1500);
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
        this.alexaService.postUser(this.currentUserName, this.imageUrl);
    }
}

