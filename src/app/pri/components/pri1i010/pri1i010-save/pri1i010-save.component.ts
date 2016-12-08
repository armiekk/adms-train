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
import { Pri1i030Component } from '../../pri1i030/pri1i030.component';
import { Pri1i040Component } from '../../pri1i040/pri1i040.component';;
import { Pri1i050Component } from '../../pri1i050/pri1i050.component';
import { Pri1i060Component } from '../../pri1i060/pri1i060.component';
import { Pri1i070Component } from '../../pri1i070/pri1i070.component';
import { Pri1i080Component } from '../../pri1i080/pri1i080.component';
import { Pri1i090Component } from '../../pri1i090/pri1i090.component';
import { Pri1i100Component } from '../../pri1i100/pri1i100.component';
import { Pri1i110Component } from '../../pri1i110/pri1i110.component';
import { Pri1i120Component } from '../../pri1i120/pri1i120.component';
import { Pri1i130Component } from '../../pri1i130/pri1i130.component';
import { Pri1i140Component } from '../../pri1i140/pri1i140.component';
import { Pri1i150Component } from '../../pri1i150/pri1i150.component';

declare var $: any;

@Component({
  selector: 'app-pri1i010-save',
  templateUrl: './pri1i010-save.component.html',
  styleUrls: ['./pri1i010-save.component.css'],
})
export class Pri1i010SaveComponent implements OnInit {

  private _selectedTab: any = Pri1i010DetailComponent;
  private tabMenuItem: MenuItem[];
  private projectSeachCondition: SearchCondition = {start: 0, size: 15};
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

    switch (this.state.mode) {
      case 'ADD':
        this.tabMenuItem = [
          { label: 'รายละเอียดทั่วไป', command: (event) => { this.selectedTab = event.item.label; } }
        ];
        break;
      case 'EDIT':
        this.tabMenuItem = [
          { label: 'รายละเอียดทั่วไป', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'ขอบแขต', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'SDE', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'เงื่อนไขโครงการ', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'งวดการส่งมอบงาน', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'ข้อจำกัด', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'Monitoring', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'ลูกค้า', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'อุปกรณ์', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'อบรม', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'อื่น ๆ', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'บุคลากรในโครงการ', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'ระบบงาน', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'Risk Analysis', command: (event) => { this.selectedTab = event.item.label; } },
          { label: 'Project Information Effort', command: (event) => { this.selectedTab = event.item.label; } },
        ];
        break;
      default:
        this.tabMenuItem = [
          { label: 'รายละเอียดทั่วไป', command: (event) => { this.selectedTab = event.item.label; } }
        ];
        break;
    }


    switch (this.state.mode) {
      case 'ADD':
        this.pritInformation = {};
        break;
      case 'EDIT':
        if (this.state.projRef !== null) {
          this.getPritInformationDetail(this.state.projRef);
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

  getPritInformationDetail(projRef: number) {
    this.priService.getPritInformationDetail(projRef)
      .subscribe((pritInformation: PritInformation) => this.pritInformation = pritInformation);
  }

  cancelPritInformation() {
    if (this.state.mode === 'EDIT') {
      this.getPritInformationDetail(this.state.projRef);
      this.message.warnMessage('ยกเลิกการแก้ไข');
    } else {
      this.pritInformation = {};
      this.message.warnMessage('ยกเลิกการบันทึก');
    }

  }

  searchProject() {
    this.isShowSearchProject = !this.isShowSearchProject;
    if (this.projectListItem.length === 0) {
      this.priService.getPritInformationByProjCode(this.projectSeachCondition).subscribe((response: PritInformation[]) => {
        this.projectListItem = response.map((pritInformation: PritInformation) => {
          return { label: pritInformation.projCode, value: pritInformation };
        });
      });
    }
  }

  private set selectedTab(tabLabel: string) {
    if (tabLabel === 'รายละเอียดทั่วไป') {
      this._selectedTab = Pri1i010DetailComponent;
    } else if (tabLabel === 'ขอบแขต') {
      this._selectedTab = Pri1i020Component;
    } else if (tabLabel === 'SDE') {
      this._selectedTab = Pri1i030Component;
    } else if (tabLabel === 'เงื่อนไขโครงการ') {
      this._selectedTab = Pri1i040Component;
    } else if (tabLabel === 'งวดการส่งมอบงาน') {
      this._selectedTab = Pri1i050Component;
    } else if (tabLabel === 'ข้อจำกัด') {
      this._selectedTab = Pri1i060Component;
    } else if (tabLabel === 'Monitoring') {
      this._selectedTab = Pri1i070Component;
    } else if (tabLabel === 'ลูกค้า') {
      this._selectedTab = Pri1i080Component;
    } else if (tabLabel === 'อุปกรณ์') {
      this._selectedTab = Pri1i090Component;
    } else if (tabLabel === 'อบรม') {
      this._selectedTab = Pri1i100Component;
    } else if (tabLabel === 'อื่น ๆ') {
      this._selectedTab = Pri1i110Component;
    } else if (tabLabel === 'บุคลากรในโครงการ') {
      this._selectedTab = Pri1i120Component;
    } else if (tabLabel === 'ระบบงาน') {
      this._selectedTab = Pri1i130Component;
    } else if (tabLabel === 'Risk Analysis') {
      this._selectedTab = Pri1i140Component;
    } else if (tabLabel === 'Project Information Effort') {
      this._selectedTab = Pri1i050Component;
    }  
  }

  submitSelectProject(){
    
  }

  cancelSelectProject(){
    
  }

  private get selectedTab() {
    return this._selectedTab;
  }

}
