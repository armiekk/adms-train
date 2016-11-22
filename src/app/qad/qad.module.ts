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
import { QaActivityLevelDirective } from './directives/qa-activity-level.directive';

@NgModule({
  imports: [
    CommonModule,
    QadRoutingModule,
    AppSharedModule
  ],
  declarations: [QadComponent, QadDashboardContainerComponent, Qad1q010Component, Qad1i010Component, QaActivityLevelDirective]
})
export class QadModule { }
