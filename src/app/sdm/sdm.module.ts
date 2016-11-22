// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdmRoutingModule } from './sdm-routing.module';
import { AppSharedModule } from '../shared';

// components
import { SdmComponent } from './sdm.component';
import { SdmDashboardContainerComponent } from './components/sdm-dashboard-container/sdm-dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    SdmRoutingModule,
    AppSharedModule
  ],
  declarations: [SdmComponent, SdmDashboardContainerComponent]
})
export class SdmModule { }
