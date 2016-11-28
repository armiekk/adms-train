// modules
import { NgModule } from '@angular/core';
import { PriRoutingModule } from './pri-routing.module';
import { AppSharedModule } from '../shared';

// providers
import { PriConstantsService } from './constants';
import { PriStateResolverService } from './services';
import { PriInformationService } from './services/pri1i010/pri-information.service';
import { ApipriinformationApi } from './api/pri1i010/api/ApipriinformationApi';
import { PritScopeApi } from './api/pri1i020/api/PritScopeApi';
import { PritLanguageApi, PritMethodApi, PritToolsApi } from './api/pri1i030/api/api';
import { PritConditionApi } from './api/pri1i040/api/api';
import { PritDeliverApi } from './api/pri1i050/api/api';
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
import { Pri1i030Component } from './components/pri1i030/pri1i030.component';
import { Pri1i040Component } from './components/pri1i040/pri1i040.component';
import { Pri1i050Component } from './components/pri1i050/pri1i050.component';
import { Pri1i060Component } from './components/pri1i060/pri1i060.component';
import { Pri1i070Component } from './components/pri1i070/pri1i070.component';
import { Pri1i080Component } from './components/pri1i080/pri1i080.component';
import { Pri1i090Component } from './components/pri1i090/pri1i090.component';
import { Pri1i100Component } from './components/pri1i100/pri1i100.component';
import { Pri1i110Component } from './components/pri1i110/pri1i110.component';
import { Pri1i120Component } from './components/pri1i120/pri1i120.component';
import { Pri1i130Component } from './components/pri1i130/pri1i130.component';
import { Pri1i140Component } from './components/pri1i140/pri1i140.component';
import { Pri1i150Component } from './components/pri1i150/pri1i150.component';


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
    Pri1i010DetailComponent,
    Pri1i030Component,
    Pri1i040Component,
    Pri1i050Component,
    Pri1i060Component,
    Pri1i070Component,
    Pri1i080Component,
    Pri1i090Component,
    Pri1i100Component,
    Pri1i110Component,
    Pri1i120Component,
    Pri1i130Component,
    Pri1i140Component,
    Pri1i150Component
  ],
  providers: [
    ApipriinformationApi, PriConstantsService, PriStateResolverService, PriInformationService, PritScopeApi, 
    PritLanguageApi, PritMethodApi, PritToolsApi, PritConditionApi, PritDeliverApi
  ]
})
export class PriModule { }
