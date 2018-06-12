import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { appRoutes } from './route.config';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatchesComponent } from './matches/matches.component';
import { LoginService } from './login/login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    GrowlModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    MessageService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
