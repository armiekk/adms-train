import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { AuthGuardService } from '../shared/guards/auth-guard/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: HomeContainerComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
