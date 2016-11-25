// modules
import { NgModule } from '@angular/core';
import { PriRoutingModule } from './pri-routing.module';
import { AppSharedModule } from '../shared';

// providers
import { PriConstantsService } from './constants';
import { PriStateResolverService } from './services';
import { PriInformationService } from './services/priInformation/pri-information.service';
import { ApipriinformationApi } from './api/pri-information/api/ApipriinformationApi';
// import { ConstantApi } from '../shared/api/cdgs-adms-pri-services';

// pipes
import { ProjectStatusPipe } from './pipes/project-status.pipe';

// directives
import { ColumnHoverDirective } from './directives/column-hover.directive';

// components
import * as components from './components';
import { PriComponent } from './pri.component';
import { PriDashboardContainerComponent } from './components/pri-dashboard-container/pri-dashboard-container.component';
import { Pri1i020Component } from './components/pri1i020/pri1i020.component';
import { PriTabContentComponent } from './components/pri-tab-content/pri-tab-content.component';
import { Pri1i010DetailComponent } from './components/pri1i010/pri1i010-detail/pri1i010-detail.component';

const COMPONENT_LIST: Array<any> = Object.keys(components).map((key) => components[key]);

@NgModule({
  imports: [
    AppSharedModule,
    PriRoutingModule,
  ],
  declarations: [
    PriComponent,
    ProjectStatusPipe,
    ColumnHoverDirective,
    ...COMPONENT_LIST,
    PriDashboardContainerComponent,
    Pri1i020Component,
    PriTabContentComponent,
    Pri1i010DetailComponent
  ],
  providers: [ApipriinformationApi, PriConstantsService, PriStateResolverService, PriInformationService]
})
export class PriModule { }
