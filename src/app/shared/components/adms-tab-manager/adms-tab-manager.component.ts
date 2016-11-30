import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-adms-tab-manager',
  templateUrl: './adms-tab-manager.component.html',
  styleUrls: ['./adms-tab-manager.component.css']
})
export class AdmsTabManagerComponent implements OnInit {
  
  @Input('menuData') menuData: MenuItem; 

  constructor() { }

  ngOnInit() {
  }

}
