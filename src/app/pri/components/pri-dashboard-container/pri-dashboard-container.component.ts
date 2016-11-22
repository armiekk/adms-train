import { Component, OnInit } from '@angular/core';
import { AdmsMenuService } from '../../../shared/services/adms-menu/adms-menu.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pri-dashboard-container',
  templateUrl: './pri-dashboard-container.component.html',
  styleUrls: ['./pri-dashboard-container.component.css']
})
export class PriDashboardContainerComponent implements OnInit {

  programList: Array<{}>;
  todoListData: Array<{}>;

  constructor(
    private admsMenuService: AdmsMenuService,
    private localtion: Location
    ) { }

  ngOnInit() {
    // this.programList = this.admsMenuService.getProgramList(this.localtion.path());
    this.programList = [
      { name: 'บันทึกข้อมูลรายละเอียดโครงการ', id: 'Pri1i010', uri: '/pri/Pri1i010' },
    ];
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
