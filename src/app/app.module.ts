// modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// services 
import * as AuthorizeService from './shared/api/cdgs-authorize-services/api/api';
import { AdmsMenuService } from './shared/services/adms-menu/adms-menu.service';
import { UserApi } from './shared/api/mockup-user-service/api/UserApi';
import { PritInformationApi } from './shared/api/cdgs-adms-pri-services/api/PritInformationApi';
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
    AppRoutingModule,
  ],
  providers: [AuthGuardService, StateService, UserApi, PritInformationApi, AuthorizeService.UserApi , AdmsMenuService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

