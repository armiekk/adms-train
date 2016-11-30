import {Component, OnInit, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import { Pri1i010DetailComponent } from '../pri1i010/pri1i010-detail/pri1i010-detail.component';
import { Pri1i020Component } from '../pri1i020/pri1i020.component';
import { Pri1i030Component } from '../pri1i030/pri1i030.component';
import { Pri1i040Component } from '../pri1i040/pri1i040.component';
import { Pri1i050Component } from '../pri1i050/pri1i050.component';
import { Pri1i060Component } from '../pri1i060/pri1i060.component';
import { Pri1i070Component } from '../pri1i070/pri1i070.component';
import { Pri1i080Component } from '../pri1i080/pri1i080.component';
import { Pri1i090Component } from '../pri1i090/pri1i090.component';
import { Pri1i100Component } from '../pri1i100/pri1i100.component';
import { Pri1i110Component } from '../pri1i110/pri1i110.component';
import { Pri1i120Component } from '../pri1i120/pri1i120.component';
import { Pri1i130Component } from '../pri1i130/pri1i130.component';
import { Pri1i140Component } from '../pri1i140/pri1i140.component';
import { Pri1i150Component } from '../pri1i150/pri1i150.component';

@Component({
  selector: 'app-pri-tab-content',
  templateUrl: './pri-tab-content.component.html',
  entryComponents: [
    Pri1i010DetailComponent, Pri1i020Component, Pri1i030Component, Pri1i040Component,
    Pri1i050Component, Pri1i060Component, Pri1i060Component, Pri1i070Component,
    Pri1i080Component, Pri1i090Component, Pri1i100Component, Pri1i110Component,
    Pri1i120Component, Pri1i130Component, Pri1i140Component, Pri1i150Component
  ],
  styleUrls: ['./pri-tab-content.component.css']
})
export class PriTabContentComponent implements OnInit {

  @ViewChild('priTabContent', { read: ViewContainerRef }) priTabContent: ViewContainerRef;

  private currentComponent = null;

  @Input() set componentData(componentParam: any) {
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
