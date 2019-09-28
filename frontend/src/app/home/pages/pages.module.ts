import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConnectedPageComponent } from './connected-page/connected-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import { FilterPipe } from './filter.pipe';
import { AlexaSignUpPageComponent } from './alexa-signup-page/alexa-signup-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlexaConnectPageComponent } from './alexa-connect-page/alexa-connect-page.component';
import { GAssistantSignUpPageComponent } from './gAssistant-signup-page/gAssistant-signup-page.component';

@NgModule({
  declarations: [
    ConnectedPageComponent,
    SignupPageComponent,
    ConnectPageComponent,
    FilterPipe,
    AlexaSignUpPageComponent,
    DashboardComponent,
    AlexaConnectPageComponent,
    GAssistantSignUpPageComponent
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
