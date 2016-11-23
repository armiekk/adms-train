import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    FieldsetModule, InputTextModule, RadioButtonModule, SelectButtonModule, ButtonModule, DataTableModule,
    DropdownModule, CalendarModule, GrowlModule, PanelModule, TabViewModule, MenuModule, CheckboxModule,
    ScheduleModule, DialogModule, InputSwitchModule, AccordionModule, SharedModule, InputMaskModule,
    TooltipModule, BreadcrumbModule, InplaceModule, InputTextareaModule, TreeTableModule, SplitButtonModule, 
    FileUploadModule, MultiSelectModule
} from 'primeng/primeng';
import { ThaiCalendarService } from './services/thai-calendar/thai-calendar.service';
import { MessageService } from './services/message/message.service';
import { TemplateComponent } from './components/template/template.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { LabelComponent } from './components/label/label/label.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [
        TemplateComponent,
        UserContainerComponent,
        DashboardComponent,
        TodoListComponent,
        DrawerComponent,
        LabelComponent,
        BreadcrumbComponent,
    ],
    imports: [
        RouterModule, CommonModule, FormsModule, 
        FieldsetModule, InputTextModule, PanelModule, AccordionModule, SharedModule, BreadcrumbModule,
        ButtonModule
    ],
    providers: [ThaiCalendarService, MessageService],
    exports: [
        CommonModule, FormsModule, 
        FieldsetModule, InputTextModule, RadioButtonModule, SelectButtonModule, ButtonModule, DataTableModule,
        DropdownModule, CalendarModule, GrowlModule, PanelModule, TabViewModule, MenuModule, RadioButtonModule,
        CheckboxModule, ScheduleModule, DialogModule, InputSwitchModule, InputMaskModule, TooltipModule, 
        TemplateComponent, UserContainerComponent, DashboardComponent, TodoListComponent, LabelComponent,
        BreadcrumbComponent, InplaceModule, InputTextareaModule, TreeTableModule, SplitButtonModule, FileUploadModule
    ]
})
export class AppSharedModule { }
