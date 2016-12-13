import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth-guard/auth-guard.service';
import { QadComponent } from './qad.component';
import { QadDashboardContainerComponent } from './components/qad-dashboard-container/qad-dashboard-container.component';
import { Qad1q010Component } from './components/qad1q010/qad1q010.component';
import { Qad1i030Component } from './components/qad1i030/qad1i030.component';
import { Qad2i010Component } from './components/qad2i010/qad2i010.component';
import { Qad2q010Component } from './components/qad2q010/qad2q010.component';
import { Qad0i030Component } from './components/qad0i030/qad0i030.component';

const routes: Routes = [
    {
        path: '',
        component: QadComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: QadDashboardContainerComponent },
            { path: 'Qad1q010', component: Qad1q010Component },
            { path: 'Qad1i030', component: Qad1i030Component },
            { path: 'Qad2i010', component: Qad2i010Component },
            { path: 'Qad2q010', component: Qad2q010Component },
            { path: 'QAD0I030', component: Qad0i030Component }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QadRoutingModule
{ }