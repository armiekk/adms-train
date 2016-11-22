// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SreRoutingModule } from './sre-routing.module';
import { AppSharedModule } from '../shared';

// components
import { SreComponent } from './sre.component';
import { SreDashboardContainerComponent } from './components/sre-dashboard-container/sre-dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    SreRoutingModule,
    AppSharedModule
  ],
  declarations: [SreComponent, SreDashboardContainerComponent]
})
export class SreModule { }
