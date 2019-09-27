import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConnectedPageComponent } from './pages/connected-page/connected-page.component';
import { AlexaSignUpPageComponent } from './pages/alexa-signup-page/alexa-signup-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlexaConnectPageComponent } from './pages/alexa-connect-page/alexa-connect-page.component';

const routes: Routes = [
  { path: 'signup/:id', component: SignupPageComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'connected', component: ConnectedPageComponent },
  { path: 'alexa', component: AlexaSignUpPageComponent },
  { path: 'alexa/connect', component: AlexaConnectPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
