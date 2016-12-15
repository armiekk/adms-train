import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { QadConstantsService } from '../../constants/qad-constants.service';
import {
  Qad3i010Service,
  ProjInfomation,
  SystemCode,
  AuditDetail,
  ChecklistSearchCondition,
} from '../../services/qad3i010/qad3i010.service';

import {
  AdmsProjectService,
  SearchCondition,
  PritInformation
} from '../../../shared/services/adms-project/adms-project.service';
import { AdmsConstantService } from '../../../shared/services/adms-constant/adms-constant.service';
import { StateService } from '../../../shared/services/state/state.service';





@Component({
  selector: 'app-qad3i010',
  templateUrl: './qad3i010.component.html',
  styleUrls: ['./qad3i010.component.css']
})
export class Qad3i010Component implements OnInit {

  private programTab: SelectItem[] = [];
  private selectedTabProgram: string;

  private pritInformation: PritInformation = {};
  private projectSeachCondition: SearchCondition = { start: 0, size: 15 };
  private projectListItem: SelectItem[] = [];
  private selectedProject: PritInformation = null;
  private isShowSearchProject: boolean = false;

  private systemCodeListItem: SelectItem[] = [];

  private searchCondition: ChecklistSearchCondition = {};
  private auditDetail: AuditDetail[] = [];

  constructor(
    private router: Router,
    private priService: AdmsProjectService,
    private qad3i010Service: Qad3i010Service,
    private admsConstant: AdmsConstantService,
    private qadConstant: QadConstantsService,
    private state: StateService
  ) { }

  ngOnInit() {
    this.selectedTabProgram = this.router.url;
    this.programTab = [
      { label: 'Checklist Search', value: '/qad/Qad3i010' },
      { label: 'QA Checklist', value: '' },
    ];

    this.auditDetail = [
      {
        auditDate: new Date(),
        auditStatus: 'Audit',
        auditType: 'บันทึกชั่วคราว'
      }
    ];

  }

  onTabProgramChange() {
    this.router.navigateByUrl(this.selectedTabProgram);
  }

  searchProject() {
    this.isShowSearchProject = !this.isShowSearchProject;
    if (this.projectListItem.length === 0) {
      // use mockup
      this.qad3i010Service.getProjectInformation()
        .subscribe((response: ProjInfomation[]) => {
          let projList = response.map((pritInformation: PritInformation) => {
            return { label: pritInformation.projCode, value: pritInformation };
          });
          this.projectListItem = [{ label: '', value: {} }, ...projList];
        });
    }
  }

  searchSystemCode() {
    this.qad3i010Service.getSystemCode(this.state.projCode)
      .subscribe((response: SystemCode[]) => console.log(response));
  }

  submitSelectProject() {
    this.state.projCode = this.selectedProject.projCode;
    this.pritInformation.projCode = this.selectedProject.projCode;
    this.pritInformation.projName = this.selectedProject.projName;
    this.qad3i010Service.getSystemCode(this.state.projCode)
      .subscribe((response: SystemCode[]) => {
        let systemList = response.map((systemCode: SystemCode) => {
          return { label: systemCode.systemName, value: systemCode };
        });
        this.systemCodeListItem = [{ label: '', value: {} }, ...systemList];
      });
    this.isShowSearchProject = !this.isShowSearchProject;
  }

  cancelSelectProject() {
    this.pritInformation.projCode = null;
    this.pritInformation.projName = null;
    this.isShowSearchProject = !this.isShowSearchProject;
  }

  clearSelectProject(event) {
    event.preventDefault();
    this.selectedProject = null;
  }

}
