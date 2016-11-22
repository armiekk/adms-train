import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  animations: [
    trigger('contentWidth', [
      state('expanded', style({ marginRight: '300px' })),
      state('collapsed', style({ marginRight: '0px' })),
      transition('collapsed => expanded', animate('200ms ease-in')),
      transition('expanded => collapsed', animate('200ms 200ms ease-out'))
    ])
  ]
})
export class TemplateComponent implements OnInit {
  private expanded = false;
  private drawerState = 'collapsed';
  private drawerType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  toggleDrawer(type: string) {
    this.drawerType = type;
    this.drawerState = this.expanded ? 'collapsed' : 'expanded';
    this.expanded = !this.expanded;
  }

  hideDrawer(){
    
  }

  logout(event) {
    event.preventDefault();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
