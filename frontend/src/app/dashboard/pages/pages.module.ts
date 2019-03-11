import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { OnlineComponent } from './online/online.component';

@NgModule({
  declarations: [ProfileComponent, OnlineComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
