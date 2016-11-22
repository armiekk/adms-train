import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pri-dashboard-container',
  templateUrl: './pri-dashboard-container.component.html',
  styleUrls: ['./pri-dashboard-container.component.css']
})
export class PriDashboardContainerComponent implements OnInit {

  programList: Array<{}>;
  todoListData: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.programList = [
      { name: 'บันทึกข้อมูลรายละเอียดโครงการ', id: 'PRI1I010', url: '/pri/search' },
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
