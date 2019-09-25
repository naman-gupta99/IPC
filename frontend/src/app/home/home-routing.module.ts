import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConnectedPageComponent } from './pages/connected-page/connected-page.component';
import { AlexaConnectPageComponent } from './pages/alexa-connect-page/alexa-connect-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'signup/:id', component: SignupPageComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'connected', component: ConnectedPageComponent },
  { path: 'alexa', component: AlexaConnectPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
