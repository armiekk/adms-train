import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  
  private items: MenuItem[];

  constructor(private location: Location) { }

  ngOnInit() {
    this.items = this.location.prepareExternalUrl(this.location.path()).split('/').map((path) => {
      return {
        label: path
      }
    });
  }

}
