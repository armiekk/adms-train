import { Component, OnInit } from '@angular/core';

export interface ProgramDetail {
  id?: string;
  name?: string;
  url?: string;
  moduleName?: string;
  subProgram?: Array<{id: string, name: string, url: string}>;
}

@Component({
  selector: 'app-sdm-dashboard-container',
  templateUrl: './sdm-dashboard-container.component.html',
  styleUrls: ['./sdm-dashboard-container.component.css']
})
export class SdmDashboardContainerComponent implements OnInit {

  private programList: Array<ProgramDetail>;
  private todoListData: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.programList = [
      {
        moduleName: 'กำหนดค่าเริ่มต้นโครงการ (บริษัท)',
        subProgram: [
          { name: 'ปฏิทิน', id: 'SDM4I010', url: 'SDM4I010'},
          { name: 'น้ำหนัก/ความก้าวหน้า', id: 'SDM4I011', url: 'SDM4I011'},
          { name: 'รอบปรับปรุงความก้าวหน้า', id: 'SDM4I012', url: 'SDM4I012'},
          { name: 'การแจ้งเตือน', id: 'SDM4I013', url: 'SDM4I013'},
          { name: 'Dashboard', id: 'SDM4I014', url: 'SDM4I014'},
        ]
      },
      {
        moduleName: 'กำหนดข้อมูลของโครงการ',
        subProgram: [
          { name: 'ระบบงาน', id: 'SDM4I020', url: 'SDM4I020'},
          { name: 'ปฏิทิน/น้ำหนัก/ความก้าวหน้า', id: 'SDM4I021', url: 'SDM4I021'},
          { name: 'รอบปรับปรุงความก้าวหน้า', id: 'SDM4I022', url: 'SDM4I022'},
          { name: 'การแจ้งเตือน', id: 'SDM4I023', url: 'SDM4I023'},
          { name: 'Dashboard', id: 'SDM4I024', url: 'SDM4I024'},
          { name: 'เอกสารสำหรับโครงการ', id: 'SDM4I025', url: 'SDM4I025'},
          { name: 'แผนงานโครงการ (Master Plan)', id: 'SDM4I027', url: 'SDM4I027'},
        ]
      },
      {
        moduleName: 'กำหนดแผนปฏิบัติงาน',
        subProgram: [
          { name: 'แผนปฏิบัติงาน (Action Plan)', id: 'SDM4I030', url: 'SDM4I030'},
          { name: 'บันทึกรายชื่อโปรแกรม', id: 'SDM4I031', url: 'SDM4I031'},
          { name: 'บันทึกปัญหาและแนวทางแก้ไข', id: 'SDM4I032', url: 'SDM4I032'},
          { name: 'บันทึกปัญหาและแนวทางแก้ไข', id: 'SDM4I033', url: 'SDM4I033'},
        ]
      },
      {
        moduleName: 'สอบถามความก้าวหน้าโครงการ',
        subProgram: [
          { name: 'ความก้าวหน้า', id: 'SDM4Q040', url: 'SDM4Q040'},
          { name: 'ค่าใช้จ่าย', id: 'SDM4Q041', url: 'SDM4Q041'},
          { name: 'เวลาที่ใช้พัฒนาระบบ', id: 'SDM4Q042', url: 'SDM4Q042'},
          { name: 'ปัญหาและแนวทางแก้ไข', id: 'SDM4Q043', url: 'SDM4Q043'},
        ]
      },
    ];
    this.todoListData = [
      {
        system: 'SDM',
        tasks: [
          { title: 'บันทึกรายละเอียดของขอบเขต', url: '/sdm', count: 1},
        ]
      }
    ];
  }

}
