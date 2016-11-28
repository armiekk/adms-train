import { Component, OnInit } from '@angular/core';
import { PriConstantsService } from '../../../constants';
import { ThaiCalendarService } from '../../../../shared/services/thai-calendar/thai-calendar.service';
import { PriInformationService, SearchCondition, PritInformation } from '../../../services/pri1i010/pri-information.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { Router } from '@angular/router';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { Pri1i010DetailComponent } from '../pri1i010-detail/pri1i010-detail.component';
import { Pri1i020Component } from '../../pri1i020/pri1i020.component';

declare var $: any;

@Component({
  selector: 'app-pri1i010-save',
  templateUrl: './pri1i010-save.component.html',
  styleUrls: ['./pri1i010-save.component.css'],
})
export class Pri1i010SaveComponent implements OnInit {

  private _selectedTab: any = Pri1i010DetailComponent;
  private tabMenuItem: MenuItem;
  private projectSeachCondition: SearchCondition = {};
  private pritInformation: PritInformation = {};
  private projectListItem: SelectItem[] = [];
  private selectedProject: PritInformation;
  private isShowSearchProject: boolean = false;

  constructor(
    private message: MessageService,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: PriInformationService,
    private locale: ThaiCalendarService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.tabMenuItem = [
      { label: 'รายละเอียดทั่วไป', command: (event) => { this.selectedTab = event.item.label; } },
      { label: 'ขอบแขต', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'SDE', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'เงื่อนไขโครงการ', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'งวดการส่งมอบงาน', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'ข้อจำกัด', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'Monitoring', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'ลูกค้า', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'อุปกรณ์', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'อบรม', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'อื่น ๆ', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'ระบบงาน', command: (event) => { this.selectedTab = event.item.label; } },
      // { label: 'Risk Analysis', command: (event) => { this.selectedTab = event.item.label; } },
    ];

    switch (this.state.mode) {
      case 'ADD':
        this.pritInformation = {};
        break;
      case 'EDIT':
        if (this.state.projCode !== null) {
          this.getPritInformationByProjCode(this.state.projCode);
        }
        break;
      default:
        this.router.navigate(['pri/Pri1i010']);
        break;
    }

  }

  savePritInformation() {
    // this.priService.createPritInformation(this.pritInformation).subscribe((response: PritInformation) => {
    //   if (response) {
    //     this.message.successMessage('บันทึกข้อมูลเสร็จสิ้น');
    //   } else {
    //     this.message.errorMessage('ไม่สามารถบันทึกข้อมูลได้');
    //   }
    // });
  }

  editPritInformation() {
  }

  getPritInformationByProjCode(projCode: string) {
    this.priService.getPritInformationByProjCode(projCode)
      .subscribe((pritInformation: PritInformation[]) => [this.pritInformation] = pritInformation);
  }

  cancelPritInformation() {
    if (this.state.mode === 'EDIT') {
      this.getPritInformationByProjCode(this.state.projCode);
      this.message.warnMessage('ยกเลิกการแก้ไข');
    } else {
      this.pritInformation = {};
      this.message.warnMessage('ยกเลิกการบันทึก');
    }

  }

  searchProject() {
    this.isShowSearchProject = !this.isShowSearchProject;
    if (this.projectListItem.length === 0) {
      this.priService.getAllProjectInformation().subscribe((response: PritInformation[]) => {
        this.projectListItem = response.map((pritInformation: PritInformation) => {
          return { label: pritInformation.projCode, value: pritInformation };
        });
      });
    }
  }

  private set selectedTab(tabLabel: string) {
    console.log(tabLabel);
    if (tabLabel === 'รายละเอียดทั่วไป') {
      this._selectedTab = Pri1i010DetailComponent;
    } else if (tabLabel === 'ขอบแขต') {
      this._selectedTab = Pri1i020Component;
    }
  }

  private get selectedTab() {
    return this._selectedTab;
  }

}
