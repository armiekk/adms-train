import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'pri', loadChildren: './pri/pri.module#PriModule' },
    { path: 'sre', loadChildren: './sre/sre.module#SreModule' },
    { path: 'asm', loadChildren: './asm/asm.module#AsmModule' },
    { path: 'qad', loadChildren: './qad/qad.module#QadModule' },
    { path: 'sdm', loadChildren: './sdm/sdm.module#SdmModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
