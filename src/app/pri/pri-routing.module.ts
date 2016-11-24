import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pri1i010SaveComponent, Pri1i010SearchComponent, PriDashboardContainerComponent, Pri1i010Component } from './components';
import { PriComponent } from './pri.component';
import { AuthGuardService } from '../shared/guards/auth-guard/auth-guard.service';
import { PriStateResolverService } from './services';

const routes: Routes = [
    {
        path: '',
        component: PriComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: PriDashboardContainerComponent },
            { 
                path: 'Pri1i010', 
                component: Pri1i010Component,
                children: [
                    { path: '', redirectTo: 'search' },
                    { path: 'search', component: Pri1i010SearchComponent },
                    { path: 'add', component: Pri1i010SaveComponent },
                    { path: 'edit', component: Pri1i010SaveComponent }
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PriRoutingModule { }
