import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SelectItem, MenuItem } from 'primeng/primeng';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';

import { Qad2i010TableComponent } from '../../components/qad2i010-table/qad2i010-table.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

interface SearchCondition {
    projType?: number;
    projCode?: string;
    projName?: string;
    projSiteCode?: string;
    projSiteName?: string;
    projManager?: string;
    projSeniorManager?: string;
    projQAManager?: string;
    projCreateByQA?: string;
    projCreateDate?: Date;
    projExternalQA?: string;
}

interface SearchProjCode {
    projCode?: string;
    projName?: string;
}

interface Emp {
    thainame?: string;
    engname?: string;
}

interface Option {
    label: string;
    value: any;
}

@Component({
    selector: 'app-qad2i010',
    templateUrl: './qad2i010.component.html',
    styleUrls: ['./qad2i010.component.css'],
    providers: [QadConstantsService, ThaiCalendarService]
})
export class Qad2i010Component implements OnInit {
    private menus: SelectItem[];
    private selectedMenu: string;
    private searchCondition: SearchCondition = {};
    private _selectedTab: any;
    private qaDatas: any[] = [];
    private selectDatas: any[] = [];
    private documentCMMIType: any[] = [];
    private templateCMMIItems: MenuItem[] = [];
    private systemDocumentStatus: any[] = [];
    private referenceGroups: SelectItem[] = [];
    private selectReferenceGroup: any;
    private systemDocuments: SelectItem[] = [];
    private selectSystemDocuments: string[] =[];
    private documentTypes: SelectItem[] = [];
    private selectDocumentType: any;
    private documentCMMICheckLists: any[] = [];
    private dataJson: any[] = [];
    private documentChecksAll: any[] = [];
    private documentChecks: any[] = [];

    constructor(private http: Http,
        private router: Router,
        private locale: ThaiCalendarService,
        private qadConstant: QadConstantsService) {
            this.menus = [];
            this.menus.push({label: 'History', value: '/qad/QAD2Q010'});
            this.menus.push({label: 'CMMI Document', value: '/qad/QAD2I010'});
            this.documentCMMIType = qadConstant.documentCMMIType;
            this.documentTypes = qadConstant.documentCMMIType;
            this.documentTypes.unshift({ label: 'เลือก Document Type', value: null });
        }

    ngOnInit() {
        this.selectedMenu = this.router.url;
        this.searchCondition.projType = 1;
        this.templateCMMIItems = [];
        this.documentCMMIType.map((v) => {
            let n: MenuItem = {};
            n.label = v.label;
            n.icon = 'fa fa-plus-circle';
            this.templateCMMIItems.push(n);
        });
        this.referenceGroups.push({ label: 'referenceGroup 1', value: 'referenceGroup 1' });
        this.referenceGroups.push({ label: 'referenceGroup 2', value: 'referenceGroup 2' });
        this.referenceGroups.push({ label: 'referenceGroup 2', value: 'referenceGroup 2' });
        this.documentCMMICheckLists = [{}];
        this.dataJson = [
            { "phaseType": "Phase: Planning", "orderSeq": "1", "documentCheckName": "Job Assignment Form [FM-04-031]", "send": true, "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "2", "documentCheckName": "Project Information Form [FM-01-011]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "3", "documentCheckName": "Equipment List Form [FM-01-003]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "4", "documentCheckName": "Contract Change Control Form [FM-01-013]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "5", "documentCheckName": "เอกสารสรุปรายละเอียดโครงการ [FM-04-158]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "6", "documentCheckName": "รายงานการวิเคราะห์ความเสี่ยง (Risk Analysis Report)", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "7", "documentCheckName": "แผนผังทีมงานโครงการ [FM-04-159]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "8", "documentCheckName": "Project Management Team (2) Software Development Team", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "9", "documentCheckName": "เอกสารการเตรียมสภาพแวดล้อมในการทำงาน [FM-04-0161]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "10", "documentCheckName": "Project Master Plan [FM-04-035]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "11", "documentCheckName": "Data Migration Plan (ถ้ามี)", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "12", "documentCheckName": "Service Request Form [FM-05-029]", "remark": "" },
            { "phaseType": "Phase: Planning", "orderSeq": "13", "documentCheckName": "Cost Estimate Form [FM-01-004]", "remark": "" },
            { "phaseType": "Phase: UAT", "orderSeq": "1", "documentCheckName": "ใบส่งสินค้าชั่วคราว [FM-05-112] หรือใบส่งสินค้าที่ออกโดยแผนกบัญชี", "remark": "" },
            { "phaseType": "Phase: UAT", "orderSeq": "2", "documentCheckName": "จดหมายส่งมอบงาน", "remark": "" },
            { "phaseType": "Phase: Closure", "orderSeq": "1", "documentCheckName": "แบบประเมินผลโครงการ [FM-04-046]", "remark": "" },
            { "phaseType": "Phase: Closure", "orderSeq": "2", "documentCheckName": "รายงานการประชุมประเมินผลโครงการ [FM-05-037]", "remark": "" },
            { "phaseType": "Phase: Closure", "orderSeq": "3", "documentCheckName": "Metrics Sheet", "remark": "" },
            { "phaseType": "Phase: Closure", "orderSeq": "4", "documentCheckName": "QA Report", "remark": "" },
            { "phaseType": "Phase: Closure", "orderSeq": "5", "documentCheckName": "CM Report", "remark": "" }
        ];

        let phase;
        for (let i = 0; i < this.dataJson.length; i++) {
            if (i === 0) {
                phase = this.dataJson[i].phaseType;

                let data = this.dataJson.filter((data) => data.phaseType === phase);
                this.documentChecks.push({ header: phase, value: data });
            } else {
                if (this.dataJson[i].phaseType !== phase) {
                    phase = this.dataJson[i].phaseType;
                    let data = this.dataJson.filter((data) => data.phaseType === phase);
                    this.documentChecks.push({ header: phase, value: data });
                } 
            }
        }
    }

    nav() {
        this.router.navigate([this.selectedMenu]);
    }


    private displaySearchProject: boolean = false;
    private isSelectedProject: boolean = false;
    private projects: any[] = [];
    private selectProject: any;
    private selectProjects: any[] = [];
    showDialogSearchProject() {
        this.searchProject();
        this.displaySearchProject = true;
    }

    searchProject() {
        this.selectProjects = [];
        this.http.get('app/qad/resources/data/projectsMockData.json')
            .map(res => res.json().data)
            .subscribe((projs) => {
                this.projects = projs.map((proj) => {
                    return { label: proj.projCode, value: proj };
                });
                this.projects.unshift({ label: 'เลือกรหัสโครงการ', value: null });
            });
    }

    onChangeSelectProject() {
        this.selectProjects = [];
        if (this.selectProject !== undefined && this.selectProject !== null) {
            this.selectProjects.push(this.selectProject);
        }
    }

    okSelectProject() {
        if (this.selectProject !== undefined && this.selectProject !== null) {
            this.searchCondition.projCode = this.selectProject.projCode;
            this.searchCondition.projName = this.selectProject.projName;
            this.isSelectedProject = true;
            this.displaySearchProject = false;

            this.selectedTab = 'LOADING';
            this.documentChecks = [];
            setTimeout(() => {
                this.selectedTab = '';
            }, 100);
            this.selectDocumentType = null;
        }
    }

    cancelSelectProject() {
        this.displaySearchProject = false;
    }

    onChangeTextProject() {
        this.isSelectedProject = false;
        this.searchCondition.projName = '';
        this.selectProject = null;
        this.selectProjects = [];
    }

    search() {
        if (this.isSelectedProject) {
            this.selectedTab = 'LOADING';
            this.http.get('app/qad/resources/data/documentCMMIMockData.json')
            .map(res => res.json().data)
            .subscribe((cmmis: any[]) => {
                let projCode = this.searchCondition.projCode;
                cmmis = cmmis.filter((cmmi) => cmmi.projCode === projCode);
                this.documentChecksAll = cmmis;

                this.documentChecks = [];
                this.selectedTab = '';
            });
        }
    }

    private set selectedTab(tabLabel: string) {
        if (tabLabel === 'LOADING') {
            this._selectedTab = LoadingComponent;
        } else {
            this.qaDatas = this.documentChecks;
            this._selectedTab = Qad2i010TableComponent;
        }
    }

    private get selectedTab() {
        return this._selectedTab;
    }

    onChangeSelectDocumentType() {
        if (this.selectDocumentType !== null) {
            this.selectedTab = 'LOADING';
            let docCheck: any[] = [];

            docCheck = this.documentChecksAll.filter((cmmi) => cmmi.documentCMMIType === this.selectDocumentType.toString());
            if (docCheck.length === 0) {
                this.http.get('app/qad/resources/data/masterDocumentCMMIMockData.json')
                    .map(res => res.json().data)
                    .subscribe((cmmis: any[]) => {
                        cmmis = cmmis.filter((cmmi) => cmmi.documentCMMIType === this.selectDocumentType.toString());
                        if (cmmis.length > 0) {
                            docCheck = cmmis;

                            let phase;
                            this.documentChecks = [];
                            for (let i = 0; i < docCheck.length; i++) {
                                if (i === 0) {
                                    phase = docCheck[i].phaseType;

                                    let data = docCheck.filter((data) => data.phaseType === phase);
                                    this.documentChecks.push({ header: phase, value: data });
                                } else {
                                    if (docCheck[i].phaseType !== phase) {
                                        phase = docCheck[i].phaseType;
                                        let data = docCheck.filter((data) => data.phaseType === phase);
                                        this.documentChecks.push({ header: phase, value: data });
                                    }
                                }
                            }
                        }

                        this.selectedTab = '';
                    });
            } else {
                let phase;
                this.documentChecks = [];
                for (let i = 0; i < docCheck.length; i++) {
                    if (i === 0) {
                        phase = docCheck[i].phaseType;

                        let data = docCheck.filter((data) => data.phaseType === phase);
                        this.documentChecks.push({ header: phase, value: data });
                    } else {
                        if (docCheck[i].phaseType !== phase) {
                            phase = docCheck[i].phaseType;
                            let data = docCheck.filter((data) => data.phaseType === phase);
                            this.documentChecks.push({ header: phase, value: data });
                        }
                    }
                }

                setTimeout(() => {
                    this.selectedTab = '';
                }, 100);
                
            }
        }
    }
}
