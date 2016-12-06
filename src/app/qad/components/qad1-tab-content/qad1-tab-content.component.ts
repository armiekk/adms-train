import { Component, OnInit, Input, ViewChild, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';

import { Qad1i010Component } from '../qad1i010/qad1i010.component';
import { Qad1i020Component } from '../qad1i020/qad1i020.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Qad2i010TableComponent } from '../qad2i010-table/qad2i010-table.component';
import { Qad0i030SaveComponent } from '../../components/qad0i030-save/qad0i030-save.component';
import { Qad0i030TableComponent } from '../qad0i030-table/qad0i030-table.component';

@Component({
    selector: 'app-qad1-tab-content',
    templateUrl: './qad1-tab-content.component.html',
    styleUrls: ['./qad1-tab-content.component.css'],
    entryComponents: [Qad1i010Component, Qad1i020Component, LoadingComponent, Qad2i010TableComponent, Qad0i030SaveComponent, Qad0i030TableComponent]
})
export class Qad1TabContentComponent implements OnInit {
    @ViewChild('qad1TabContent', { read: ViewContainerRef }) qad1TabContent: ViewContainerRef;
    @Input() qaDatas: any[];
    @Output() onSave = new EventEmitter<any>();
    private currentComponent = null;
    @Input() set componentData(componentParam: any) {
        if (componentParam !== undefined) {
            let injector = ReflectiveInjector.fromResolvedProviders([], this.qad1TabContent.parentInjector);
            let factory = this.resolver.resolveComponentFactory<{qaDatas?: any[], onSave?: any}>(componentParam);
            let component = factory.create(injector);
            this.qad1TabContent.insert(component.hostView);
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }

            component.instance.qaDatas = this.qaDatas;
            component.instance.onSave = this.onSave;
            this.currentComponent = component;
        }
    }

    constructor(private resolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

}
