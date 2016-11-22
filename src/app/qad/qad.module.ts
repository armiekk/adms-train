// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QadRoutingModule } from './qad-routing.module';
import { AppSharedModule } from '../shared';

// components
import { QadComponent } from './qad.component';
import { QadDashboardContainerComponent } from './components/qad-dashboard-container/qad-dashboard-container.component';
import { Qad1q010Component } from './components/qad1q010/qad1q010.component';
import { Qad1i010Component } from './components/qad1i010/qad1i010.component';
import { Qad1i020Component } from './components/qad1i020/qad1i020.component';
import { Qad1i030Component } from './components/qad1i030/qad1i030.component';

@NgModule({
  imports: [
    CommonModule,
    QadRoutingModule,
    AppSharedModule
  ],
  declarations: [QadComponent, QadDashboardContainerComponent, Qad1q010Component, Qad1i010Component, Qad1i020Component, Qad1i030Component]
})
export class QadModule { }
