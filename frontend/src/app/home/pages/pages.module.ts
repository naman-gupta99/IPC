import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnectedPageComponent } from './connected-page/connected-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ConnectedPageComponent, SignupPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [ConnectedPageComponent, SignupPageComponent]
})
export class PagesModule { }
