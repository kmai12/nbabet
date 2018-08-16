import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './_services/user.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { AuthenticationService } from './_services/authentication.service';
import { PublicComponent } from './public/public.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeaderComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    PublicComponent,
    MainComponent
    ],
  providers: [
    UserService,
    AuthenticationService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
