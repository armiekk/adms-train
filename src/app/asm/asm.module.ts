// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsmRoutingModule } from './asm-routing.module';
import { AppSharedModule } from '../shared';

// components
import { AsmComponent } from './asm.component';
import { AsmDashboardContainerComponent } from './components/asm-dashboard-container/asm-dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    AsmRoutingModule,
    AppSharedModule
  ],
  declarations: [
    AsmComponent,
    AsmDashboardContainerComponent,
  ]
})
export class AsmModule { }
