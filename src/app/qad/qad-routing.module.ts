import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QadComponent } from './qad.component';
import { QadDashboardContainerComponent } from './components/qad-dashboard-container/qad-dashboard-container.component';
import { Qad1q010Component } from './components/qad1q010/qad1q010.component';
import { Qad1i010Component } from './components/qad1i010/qad1i010.component';

const routes: Routes = [
    {
        path: '',
        component: QadComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: QadDashboardContainerComponent },
            { path: 'QAD1Q010', component: Qad1q010Component },
            { path: 'QAD1I010', component: Qad1i010Component },
            { path: 'QAD1I010/:projCode', component: Qad1i010Component }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QadRoutingModule 
{ }