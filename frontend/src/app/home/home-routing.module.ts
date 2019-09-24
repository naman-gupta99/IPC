import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConnectedPageComponent } from './pages/connected-page/connected-page.component';
import { ConnectPageComponent } from './pages/connect-page/connect-page.component';
import { AlexaConnectPageComponent } from './pages/alexa-connect-page/alexa-connect-page.component';

const routes: Routes = [
  { path: 'signup/:id', component: SignupPageComponent },
  { path: 'connect/:id', component: ConnectPageComponent },
  { path: 'connected', component: ConnectedPageComponent },
  { path: 'alexa', component: AlexaConnectPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
