import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  imageUrl: any = 'http://i.pravatar.cc/500?img=7';
  signUpForm: FormGroup;
  forbiddenUsernames = [];
  userNameValid = false;
  currentUserName: string;
  id: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private pagesService: PagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.pagesService.usernames.push(this.currentUserName.toLowerCase());
    this.forbiddenUsernames.push(this.currentUserName.toLowerCase());
    this.pagesService.getNewUserObject(this.id, this.currentUserName.toLowerCase(), this.imageUrl);
  }
}
