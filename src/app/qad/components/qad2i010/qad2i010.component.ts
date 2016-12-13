import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SelectItem, MenuItem } from 'primeng/primeng';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';
import { StateService } from '../../../shared/services/state/state.service';

import { Qad2i010TableComponent } from '../../components/qad2i010-table/qad2i010-table.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component'
import { Qad0i030SaveComponent } from '../../components/qad0i030-save/qad0i030-save.component';

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
    private menus: SelectItem[] = [];
    private selectedMenu: string;
    private searchCondition: SearchCondition = {};
    private CMMIVersionDate: Date;
    private CMMIVersion: string;
    private CMMIChangeDes: string;
    private _selectedCMMITemplate: any;
    private _selectedTab: any;
    private CMMITemplateDatas: any[] = [];
    private qaDatas: any[] = [];
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
    private documentChecksAll: any[] = [];
    private documentChecks: any[] = [];
    private isCreateMasterTemplateCMMI: boolean = false;
    private isSearch: boolean = false;

    constructor(private http: Http,
        private router: Router,
        private locale: ThaiCalendarService,
        private qadConstant: QadConstantsService,
        private state: StateService) {
            this.menus.push({label: 'History', value: '/qad/Qad2q010'});
            this.menus.push({label: 'CMMI Document', value: '/qad/Qad2i010'});
            this.documentCMMIType = qadConstant.groupDocumentCMMIType;
            this.documentTypes = qadConstant.documentCMMIType;
            this.documentTypes.unshift({ label: 'เลือก Document Type', value: null });
        }

    ngOnInit() {
        this.selectedMenu = this.router.url;
        if (this.state.projCode !== null) {
            this.http.get('app/qad/resources/data/projectsMockData.json')
            .map(res => res.json().data)
            .subscribe((projs: any[]) => {
                let project = projs.filter((proj) => proj.projCode === this.state.projCode);
                if (project.length === 1) {
                    this.searchCondition.projCode = project[0].projCode;
                    this.searchCondition.projName = project[0].projName;
                    this.isSelectedProject = true;
                    this.search();
                }
            });
        }

        this.searchCondition.projType = 1;
        this.templateCMMIItems = [];
        this.documentCMMIType.map((v) => {
            let n: MenuItem = {};
            n.label = v.label;
            n.icon = 'fa fa-plus-circle';
            n.command = (event) => {
                this.selectedCMMITemplate = 'LOADING';
                setTimeout(() => { this.selectedCMMITemplate = event.item.label; }, 100);
            };
            this.templateCMMIItems.push(n);
        });
        this.documentCMMIType.map((v) => { 
            this.referenceGroups.push(v);
        });
        this.referenceGroups.unshift({ label: 'เลือกกลุ่มเอกสาร', value: null });
        this.documentCMMICheckLists = [{}];
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

            this.isSearch = false;
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
        
        this.isSearch = false;
        //Clear table
        this.selectedTab = 'LOADING';
        this.documentChecks = [];
        setTimeout(() => {
            this.selectedTab = '';
        }, 100);
        this.selectDocumentType = null;
    }

    search() {
        if (this.isSelectedProject) {
            this.isSearch = true;
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

    private displaySaveAndSendToApprove = false;
    showDialogSaveAndSendToApprove() {
        this.displaySaveAndSendToApprove = true;
    }

    saveAndSendToApprove(choice: number) {
        switch (choice) {
            case 1:
                // todo save to database
                this.displaySaveAndSendToApprove = false;
                break;
            case 2:
                // todo gen new version and save to database
                this.displaySaveAndSendToApprove = false;
                break;
        }
    }

    save() {

    }

    print() {
        console.log('--start--print--');
        console.log(this.CMMITemplateDatas);
        console.log(this.documentChecksAll);
        console.log('--end--print--');
    }

    private set selectedCMMITemplate(label: string) {
        if(this.isSelectedProject && this.isSearch) {
            this.isCreateMasterTemplateCMMI = true;
            if (label === 'LOADING') {
                this._selectedCMMITemplate = LoadingComponent;
            } else {
                let item = this.documentCMMIType.filter((item) => item.label === label);
                let type = item[0].value.toString();
                this.CMMITemplateDatas = [{ documentType: type, documentName: label, projCode: this.searchCondition.projCode, value: [] }];
                this._selectedCMMITemplate = Qad0i030SaveComponent;
            }
        }
    }

    private get selectedCMMITemplate() {
        return this._selectedCMMITemplate;
    }

    private set selectedTab(tabLabel: string) {
        if (tabLabel === 'LOADING') {
            this._selectedTab = LoadingComponent;
        } else {
            this.qaDatas = this.documentChecks;
            this._selectedTab = Qad2i010TableComponent;
        }
    }

    onSaveCMMITemplate(value: any) {
        let isSave = value[0].isSave;
        if (isSave) {
            //1. Save to master template database <== Todo
            //2. Save to variable 'documentChecksAll' on page with 'projCode'

            let data: any[] = [];
            let v = value[0].value;
            for (let i = 0; i < v.length; i++) {
                let v2 = v[i].value;
                for (let j = 0; j < v2.length; j++) {
                    let newData: any = {};
                    newData.projCode = value[0].projCode;
                    newData.documentCMMIType = value[0].documentType;
                    newData.phaseType = v2[j].phaseType;
                    newData.orderSeq = v2[j].orderSeq;
                    newData.documentCheckName = v2[j].documentCheckName;
                    newData.send = v2[j].send;
                    newData.remark = v2[j].remark;
                    data.push(newData);
                }
            }

            this.documentChecksAll.push(...data);
        }

        this.isCreateMasterTemplateCMMI = false;
    }

    private get selectedTab() {
        return this._selectedTab;
    }

    onChangeSelectDocumentType() {
        if (this.isSelectedProject && this.selectDocumentType !== null) {
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

    onChangeSelectReferenceGroup() {

    }
}
