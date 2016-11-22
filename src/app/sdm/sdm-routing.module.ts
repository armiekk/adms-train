import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdmComponent } from './sdm.component';
import { SdmDashboardContainerComponent } from './components/sdm-dashboard-container/sdm-dashboard-container.component';

const routes: Routes = [
    { 
        path: '', 
        component: SdmComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: SdmDashboardContainerComponent },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SdmRoutingModule { }