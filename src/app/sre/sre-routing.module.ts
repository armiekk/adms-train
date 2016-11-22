import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SreComponent } from './sre.component';
import { SreDashboardContainerComponent } from './components/sre-dashboard-container/sre-dashboard-container.component';

const routes: Routes = [
    {
        path: '',
        component: SreComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: SreDashboardContainerComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SreRoutingModule { }
