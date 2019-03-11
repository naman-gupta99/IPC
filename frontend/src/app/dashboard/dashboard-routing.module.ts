import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineComponent } from './pages/online/online.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'online', component: OnlineComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
