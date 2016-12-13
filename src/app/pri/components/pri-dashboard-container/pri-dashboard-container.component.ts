import { Component, OnInit } from '@angular/core';
import { AdmsMenuService, Program } from '../../../shared/services/adms-menu/adms-menu.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pri-dashboard-container',
  templateUrl: './pri-dashboard-container.component.html',
  styleUrls: ['./pri-dashboard-container.component.css']
})
export class PriDashboardContainerComponent implements OnInit {

  private programList: Program[];
  private todoListData: Array<{}>;

  constructor(
    private admsMenuService: AdmsMenuService,
    private localtion: Location
  ) { }

  ngOnInit() {
    this.programList = this.admsMenuService.getProgramList(this.admsMenuService.getParentNodeId());
    this.todoListData = [
      {
        system: 'Project Information',
        tasks: [
          { title: 'นำคนเข้าโครงการ', url: '/pri/search', count: 1 },
        ]
      }
    ];
  }

}
