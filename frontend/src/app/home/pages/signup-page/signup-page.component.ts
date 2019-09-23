import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';

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
  constructor(private authService: AuthService, private route: ActivatedRoute, private pagesService: PagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.pagesService.getNewUserObject(this.id, this.currentUserName, this.imageUrl);
  }
}
