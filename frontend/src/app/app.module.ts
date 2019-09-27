import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { AuthService } from "./auth/auth.service";
import { PagesService } from "./home/pages/pages.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule],
  providers: [AuthService, PagesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
