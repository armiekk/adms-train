import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  todoListData: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.todoListData = [
      {
        system: 'Project Information',
        tasks: [
          { title: 'นำคนเข้าโครงการ', url: '/pri/search', count: 1 },
        ]
      },
      {
        system: 'Service Request',
        tasks: [
          { title: 'รอรับ', url: '/sre', count: 1 },
          { title: 'รออนุมัติ', url: '/sre', count: 1 },
          { title: 'รอส่ง', url: '/sre', count: 1 },
        ]
      },
      {
        system: 'Assesment',
        tasks: [
        ]
      },
      {
        system: 'QAD',
        tasks: [
        ]
      },
      {
        system: 'SDM',
        tasks: [
          { title: 'บันทึกรายละเอียดของขอบเขต', url: 'sdm', count: 1 },
        ]
      }
    ];
  }

}
