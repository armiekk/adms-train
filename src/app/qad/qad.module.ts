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
import { Qad2i010Component } from './components/qad2i010/qad2i010.component';
import { Qad1TabContentComponent } from './components/qad1-tab-content/qad1-tab-content.component';
import { HistoryStatusPipe } from './pipes/history-status.pipe';
import { Qad2i010TableComponent } from './components/qad2i010-table/qad2i010-table.component';
import { Qad2q010Component } from './components/qad2q010/qad2q010.component';
import { Qad0i030Component } from './components/qad0i030/qad0i030.component';
import { Qad0i030SaveComponent } from './components/qad0i030-save/qad0i030-save.component';
import { Qad0i030TableComponent } from './components/qad0i030-table/qad0i030-table.component';
import { Qad3i010Component } from './components/qad3i010/qad3i010.component';

// services
import { QadConstantsService } from './constants/qad-constants.service';
import { Qad3i010Service } from './services/qad3i010/qad3i010.service';

@NgModule({
  imports: [
    CommonModule,
    QadRoutingModule,
    AppSharedModule
  ],
  declarations: [QadComponent, QadDashboardContainerComponent, Qad1q010Component, Qad1i010Component, Qad1i020Component, Qad1i030Component, Qad2i010Component, Qad1TabContentComponent, HistoryStatusPipe, Qad2i010TableComponent, Qad2q010Component, Qad0i030Component, Qad0i030SaveComponent, Qad0i030TableComponent, Qad3i010Component],
  providers: [QadConstantsService, Qad3i010Service]
})
export class QadModule { }
