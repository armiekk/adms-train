import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QadComponent } from './qad.component';
import { QadDashboardContainerComponent } from './components/qad-dashboard-container/qad-dashboard-container.component';
import { Qad1q010Component } from './components/qad1q010/qad1q010.component';
import { Qad1i030Component } from './components/qad1i030/qad1i030.component';
import { Qad2i010Component } from './components/qad2i010/qad2i010.component';

const routes: Routes = [
    {
        path: '',
        component: QadComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: QadDashboardContainerComponent },
            { path: 'QAD1Q010', component: Qad1q010Component },
            { path: 'QAD1I030', component: Qad1i030Component },
            { path: 'QAD2I010', component: Qad2i010Component }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QadRoutingModule
{ }