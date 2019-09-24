import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConnectedPageComponent } from './connected-page/connected-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import { FilterPipe } from './filter.pipe';
import { AlexaConnectPageComponent } from './alexa-connect-page/alexa-connect-page.component';

@NgModule({
  declarations: [
    ConnectedPageComponent,
    SignupPageComponent,
    ConnectPageComponent,
    FilterPipe,
    AlexaConnectPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [ConnectedPageComponent, SignupPageComponent, ConnectPageComponent]
})
export class PagesModule { }
