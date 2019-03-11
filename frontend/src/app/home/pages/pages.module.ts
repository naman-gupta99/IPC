import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { ConnectedComponent } from './connected/connected.component';

@NgModule({
  declarations: [SignupComponent, ConnectedComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
