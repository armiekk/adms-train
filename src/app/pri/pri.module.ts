// modules
import { NgModule } from '@angular/core';
import { PriRoutingModule } from './pri-routing.module';
import { AppSharedModule } from '../shared';

// providers
import { PriConstantsService } from './constants';
import { PriStateResolverService } from './services';
import { PriInformationService } from './services/priInformation/pri-information.service';
import { ApipriinformationApi } from './api/pri-information/api/ApipriinformationApi';
import { PritScopeApi } from './api/pri-scope/api/PritScopeApi';
// import { ConstantApi } from '../shared/api/cdgs-adms-pri-services';

// pipes
import { ProjectStatusPipe } from './pipes/project-status.pipe';

// directives
import { ColumnHoverDirective } from './directives/column-hover.directive';

// components
import { Pri1i010Component, Pri1i010SaveComponent, Pri1i010SearchComponent } from './components/pri1i010';
import { PriComponent } from './pri.component';
import { PriDashboardContainerComponent } from './components/pri-dashboard-container/pri-dashboard-container.component';
import { Pri1i020Component } from './components/pri1i020/pri1i020.component';
import { PriTabContentComponent } from './components/pri-tab-content/pri-tab-content.component';
import { Pri1i010DetailComponent } from './components/pri1i010/pri1i010-detail/pri1i010-detail.component';


@NgModule({
  imports: [
    AppSharedModule,
    PriRoutingModule,
  ],
  declarations: [
    PriComponent,
    ProjectStatusPipe,
    ColumnHoverDirective,
    Pri1i010Component,
    Pri1i010SaveComponent,
    Pri1i010SearchComponent,
    PriDashboardContainerComponent,
    Pri1i020Component,
    PriTabContentComponent,
    Pri1i010DetailComponent
  ],
  providers: [ApipriinformationApi, PriConstantsService, PriStateResolverService, PriInformationService, PritScopeApi]
})
export class PriModule { }
