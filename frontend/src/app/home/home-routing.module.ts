import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ConnectedPageComponent } from './pages/connected-page/connected-page.component';

const routes: Routes = [
  { path: 'signup/:id', component: SignupPageComponent },
  { path: 'connected', component: ConnectedPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
