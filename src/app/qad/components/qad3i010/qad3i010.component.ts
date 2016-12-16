import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { QadConstantsService } from '../../constants/qad-constants.service';
import {
  Qad3i010Service,
  ProjInfomation,
  SystemCode,
  AuditDetail,
  ChecklistDetail,
  Employee,
  QaNameCondition,
  ResponsibleCondition
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

  // Project Detail
  private pritInformation: PritInformation = {};
  private projectSeachCondition: SearchCondition = { start: 0, size: 15 };
  private projectListItem: SelectItem[] = [];
  private selectedProject: PritInformation = null;
  private isShowSearchProject: boolean = false;


  // Checklist Detail
  private systemCodeListItem: SelectItem[] = [];
  private checklistDetail: ChecklistDetail = {};
  private auditDetail: AuditDetail[] = [];

  // QA Name
  private isShowSearchQaName: boolean = false;
  private qaNameList: Employee[] = [];
  private qaNameSearchCondition: QaNameCondition = {};
  private selectedQaName: Employee;

  // Responsible
  private isShowSearchResponsible: boolean = false;
  private responsibleList: Employee[] = [];
  private responsibleSearchCondition: ResponsibleCondition = {};
  private selectedResponsible: Employee;

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
      { label: 'Checklist Search', value: '' },
      { label: 'QA Checklist', value: '/qad/Qad3i010' },
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

  submitSearchProject() {
    this.state.projCode = this.selectedProject.projCode;
    this.pritInformation.projCode = this.selectedProject.projCode;
    this.pritInformation.projName = this.selectedProject.projName;
    this.qad3i010Service.getSystemCode(this.state.projCode)
      .subscribe((response: SystemCode[]) => {
        let systemList = response.map((systemCode: SystemCode) => {
          return { label: systemCode.systemAbbr, value: systemCode };
        });
        this.systemCodeListItem = [{ label: '', value: {} }, ...systemList];
      });
    this.isShowSearchProject = !this.isShowSearchProject;
  }

  cancelSearchProject() {
    this.pritInformation.projCode = null;
    this.pritInformation.projName = null;
    this.isShowSearchProject = !this.isShowSearchProject;
  }

  clearSearchProject(event) {
    event.preventDefault();
    this.selectedProject = null;
  }

  showSearchQaNameDialog(){
    this.isShowSearchQaName = !this.isShowSearchQaName;
    this.qaNameSearchCondition = {};
    this.qaNameList = [];
  }

  searchQaName(){
    this.qad3i010Service.getQaNameByCondition(this.qaNameSearchCondition)
      .subscribe((response: Employee[]) => this.qaNameList = response);
  }

  submitSearchQaName(){
    this.checklistDetail.qaName = this.selectedQaName.thainame;
    this.isShowSearchQaName = !this.isShowSearchQaName;
  }

  cancelSearchQaName(){
    this.selectedQaName = null;
    this.qaNameList = [];
    this.isShowSearchQaName = !this.isShowSearchQaName;
  }

  showSearchResponsibleDialog(){
    this.isShowSearchResponsible = !this.isShowSearchResponsible;
    this.responsibleSearchCondition = {};
    this.responsibleList = [];
  }

  searchResponsible(){
    this.qad3i010Service.getResponsibleByCondition(this.responsibleSearchCondition)
      .subscribe((response: Employee[]) => this.responsibleList = response);
  }

  submitSearchResponsible(){
    this.checklistDetail.responsible = this.selectedResponsible.thainame;
    this.isShowSearchResponsible = !this.isShowSearchResponsible;
  }

  cancelSearchResponsible(){
    this.selectedResponsible = null;
    this.responsibleList = [];
    this.isShowSearchResponsible = !this.isShowSearchResponsible;
  }

}
