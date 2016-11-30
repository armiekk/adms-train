import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sre-dashboard-container',
  templateUrl: './sre-dashboard-container.component.html',
  styleUrls: ['./sre-dashboard-container.component.css']
})
export class SreDashboardContainerComponent implements OnInit {

  private programList: Array<{}>;
  private todoListData: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.programList = [
      { name: 'บันทึกข้อมูลคำร้องขอ', id: 'SER1I001', url: 'SER1I001' },
      { name: 'บันทึกข้อมูลรับคำร้องขอ', id: 'SER1I002', url: 'SER1I002' },
      { name: 'บันทึกข้อมูลปิดคำร้องขอ', id: 'SER1I003', url: 'SER1I003' },
    ];
    this.todoListData = [
      {
        system: 'Service Request',
        tasks: [
          { title: 'รอรับ', url: '/sre', count: 1 },
          { title: 'รออนุมัติ', url: '/sre', count: 1 },
          { title: 'รอส่ง', url: '/sre', count: 1 },
        ]
      }
    ];
  }

}
