import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './_services/user.service';
import { HttpClient, HttpHandler, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { AuthenticationService } from './_services/authentication.service';
import { PublicComponent } from './public/public.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { AppLoadModule } from './app-load/app-load.module';
import { JwtInterceptor } from './_helpers/jwt-interceptor';
import { ModalComponent } from './_directives/modal.component';
import { ModalService } from './_services/modal.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppLoadModule, // Used for initial set up of fake data.
    FormsModule // Needed for 2 way data binding directive [(ngModel)].
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeaderComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    PublicComponent,
    MainComponent,
    FooterComponent,
    ChallengeComponent,
    ModalComponent
    ],
  providers: [
    UserService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, //  Interceptor to add authentication header.
    fakeBackendProvider, // fake backend.
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
