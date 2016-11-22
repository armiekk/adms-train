// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/app-shared.module';
import { HomeRoutingModule } from './home-routing.module';

// components
import { HomeComponent } from './home.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { HomeScheduleComponent } from './components/home-schedule/home-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppSharedModule
  ],
  declarations: [HomeComponent, HomeScheduleComponent, HomeContainerComponent]
})
export class HomeModule { }
