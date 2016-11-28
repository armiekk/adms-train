import {Component, OnInit, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import { Pri1i010DetailComponent } from '../pri1i010/pri1i010-detail/pri1i010-detail.component';
import { Pri1i020Component } from '../pri1i020/pri1i020.component';
import { Pri1i030Component } from '../pri1i030/pri1i030.component';

@Component({
  selector: 'app-pri-tab-content',
  templateUrl: './pri-tab-content.component.html',
  entryComponents: [Pri1i020Component, Pri1i010DetailComponent, Pri1i030Component],
  styleUrls: ['./pri-tab-content.component.css']
})
export class PriTabContentComponent implements OnInit {

  @ViewChild('priTabContent', { read: ViewContainerRef }) priTabContent: ViewContainerRef;

  private currentComponent = null;

  @Input() set componentData(componentParam: any) {
    // let injector = ReflectiveInjector.fromResolvedProviders(null, this.priTabContent.parentInjector);
    let injector = ReflectiveInjector.fromResolvedProviders([], this.priTabContent.parentInjector);
    
    let factory = this.resolver.resolveComponentFactory(componentParam);
    
    let component = factory.create(injector);
    
    this.priTabContent.insert(component.hostView);
    
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    
    this.currentComponent = component;
  }

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

}
