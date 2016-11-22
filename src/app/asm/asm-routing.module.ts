import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsmComponent } from './asm.component';
import { AsmDashboardContainerComponent } from './components/asm-dashboard-container/asm-dashboard-container.component';

const routes: Routes = [
    {
        path: '',
        component: AsmComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AsmDashboardContainerComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsmRoutingModule { }
