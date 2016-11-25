// modules
import { NgModule } from '@angular/core';
import { PriRoutingModule } from './pri-routing.module';
import { AppSharedModule } from '../shared';

// providers
import { PriConstantsService } from './constants';
import { PriStateResolverService } from './services';
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
    Pri1i020Component
  ],
  providers: [ApipriinformationApi, PriConstantsService, PriStateResolverService]
})
export class PriModule { }
