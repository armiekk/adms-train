import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
  animations: [
    trigger('panelTrigger', [
      state('expanded', style({ transform: 'translateX(0px)' })),
      state('collapsed', style({ transform: 'translateX(300px)' })),
      transition('collapsed => expanded', animate('200ms ease-in')),
      transition('expanded => collapsed', animate('200ms ease-out'))
    ])
  ]
})
export class DrawerComponent implements OnInit {

  private panelState: string = 'collapsed';
  isExpanded: boolean = false;
  selectedPanel: string;

  constructor() { }

  ngOnInit() {
  }

  togglePanel(event, selecedPanel: string) {
    event.preventDefault();
    if (this.selectedPanel !== selecedPanel && this.selectedPanel) {
      this.selectedPanel = selecedPanel;
      return;
    }
    if (!this.isExpanded) {
      this.panelState = 'expanded';
      this.selectedPanel = selecedPanel;
      this.isExpanded = !this.isExpanded;
    } else {
      this.panelState = 'collapsed';
      this.selectedPanel = null;
      this.isExpanded = !this.isExpanded;
    }
  }
}
