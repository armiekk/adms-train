// modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { Ng2Webstorage } from 'ng2-webstorage';

// services 
import { AuthApi } from './shared/api/user/api/AuthApi';
import * as AuthorizeService from './shared/api/cdgs-authorize-services/api/api';
import { AdmsMenuService } from './shared/services/adms-menu/adms-menu.service';
import { UserApi } from './shared/api/mockup-user-service/api/UserApi';
import { PritInformationApi } from './shared/api/mockup-prit-information-service/api/PritInformationApi';
import { AuthGuardService } from './shared/guards/auth-guard/auth-guard.service';
import { StateService } from './shared/services/state/state.service';

// components 
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    AppRoutingModule,
  ],
  providers: [AuthApi, AuthGuardService, StateService, UserApi, PritInformationApi, AuthorizeService.UserApi , AdmsMenuService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

