import { Component, OnInit, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TreeNode, SharedModule, MenuItem } from 'primeng/primeng';
import { QaActivityLevelDirective } from '../../directives/qa-activity-level.directive';

import { PritInformation } from '../../api/prit-information/model/PritInformation';

import { QadtActivtiesApi } from '../../api/qadt-activities/api/QadtActivtiesApi';
import { PritInformationApi } from '../../api/prit-information/api/PritInformationApi';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';
import { Subscription } from 'rxjs';

interface SearchCondition {
    projCode?: string;
    projName?: string;
    projCreateByQA?: string;
    projCreateDate?: Date;
}

interface SearchProjCode {
    projCode?: string;
    projName?: string;
}

interface qaPlan {
    qadtActivtiesRef?: number;
    orderSeq?: number;
    prevQadtActivtiesRef?: string;
    activityLevel?: number;
    qaActivties?: string;
    versionNo?: number;
    owner?: string;
    createBy?: string;
    createDate?: Date;
    updateBy?: string;
    updateDate?: Date;
    workCategoryCode?: number;
    workCategory?: string;
    planAction?: number;
    planEffort?: number;
    remark?: string;
}

interface Emp {
    thainame?: string;
    engname?: string;
}

@Component({
    selector: 'app-qad1i010',
    templateUrl: './qad1i010.component.html',
    styleUrls: ['./qad1i010.component.css'],
    providers: [QadtActivtiesApi, QadConstantsService, ThaiCalendarService, PritInformationApi]
})
export class Qad1i010Component implements OnInit, OnDestroy {
    private pritInformation: Subscription;
    private searchCondition: SearchCondition;
    private modeOption: string;
    private disabledEditText: boolean;
    saveBtnGroup: MenuItem[];

    qaPlans: qaPlan[];

    constructor(private locale: ThaiCalendarService,
                private qadtActivitesService: QadtActivtiesApi,
                private qadConstant: QadConstantsService,
                private pritInformationService: PritInformationApi) {
        this.modeOption = "new";
        this.disabledEditText = true;
    }

    ngOnInit() {
        this.searchCondition = {};
        this.searchProjCode = {};
        this.dialogQaPlan = {};

        this.saveBtnGroup = [
            {
                label: 'บันทึก', icon: 'fa-floppy-o', command: () => {
                    this.saveQaPlan();
                }
            },
            {
                label: 'ยกเลิก', icon: 'fa-close', command: () => {
                    this.searchCondition = {};
                }
            }
        ];

        /*this.qaPlans = [
            {orderSeq: 1, activityLevel: 1, qaActivties: "T-Create QA Plan 1", workCategoryCode: 3, workCategory: "Other", planAction: 1, planEffort: 0, remark: ""},
            {orderSeq: 2, activityLevel: 1, qaActivties: "T-Create QA Plan 2", workCategoryCode: 3, workCategory: "Other", planAction: 1, planEffort: 0, remark: ""},
            {orderSeq: 3, activityLevel: 1, qaActivties: "T-Create QA Plan 3", workCategoryCode: 1, workCategory: "Audit", planAction: 1, planEffort: 0, remark: ""},
            {orderSeq: 4, activityLevel: 1, qaActivties: "T-Create QA Plan 4", workCategoryCode: 3, workCategory: "Other", planAction: 1, planEffort: 0, remark: ""},
            {orderSeq: 4.1, activityLevel: 2, qaActivties: "T-Create QA Plan 4.1", workCategoryCode: 3, workCategory: "Other", planAction: 1, planEffort: 0, remark: ""},
            {orderSeq: 4.2, activityLevel: 2, qaActivties: "T-Create QA Plan 4.2", workCategoryCode: 3, workCategory: "Other", remark: ""},
            {orderSeq: 4.3, activityLevel: 2, qaActivties: "T-Create QA Plan 4.3", workCategoryCode: 3, workCategory: "Other", planAction: 1, planEffort: 0, remark: ""}
        ];*/
    }

    private searchProjCode: SearchProjCode;
    private selectedProj: PritInformation;
    private resultSearchProjects: PritInformation[];
    private displaySearchProjCode: boolean = false;
    showDialogSearchProjCode(projCode: string) {
        this.selectedProj = null;
        this.searchProjCode.projCode = projCode;
        this.searchByProjCode();
        this.displaySearchProjCode = true;
    }

    onRowSelectProj() {
        this.searchCondition.projCode = this.selectedProj.projCode;
        this.searchCondition.projName = this.selectedProj.projName;
        this.selectedProj = undefined;
        this.displaySearchProjCode = false;
    }

    searchByProjCode() {
        this.pritInformationService.defaultHeaders.append('Content-Type', 'application/json');
        this.pritInformationService.defaultHeaders.append('Accept', 'application/json');
        if (this.searchProjCode !== undefined && this.searchProjCode.projCode !== undefined && this.searchProjCode.projCode.trim() !== '') {
            this.pritInformation = this.pritInformationService
                .pritInfomationFindByProjCode(this.searchProjCode.projCode.trim())
                .subscribe((response: PritInformation[]) => this.resultSearchProjects = response);
        } else {
            this.pritInformation = this.pritInformationService
                .pritInformationFind()
                .subscribe((response: PritInformation[]) => this.resultSearchProjects = response);
        }
    }

    clearTextProjName() {
        if (this.searchCondition.projCode !== undefined && this.searchCondition.projCode.trim() === '') {
            this.searchCondition.projName = ''
        }
    }

    private searchCreateByQA: string;
    private selectedCreateByQA: Emp;
    private resultSearchProjCreateByQA: Emp[];
    private displaySearchProjCreateByQA: boolean = false;
    showDialogSearchprojCreateByQA(projCreateByQA: string) {
        this.selectedCreateByQA = null;
        this.searchCreateByQA = projCreateByQA;
        this.searchByCreateByQA();
        this.displaySearchProjCreateByQA = true;
    }

    onRowSelectCreateByQA() {
        this.searchCondition.projCreateByQA = this.selectedCreateByQA.thainame;
        this.selectedCreateByQA = undefined;
        this.displaySearchProjCreateByQA = false;
    }

    searchByCreateByQA() {
        //Mock Data
        this.resultSearchProjCreateByQA = [
            { thainame: "ณัฐรี เตชะทวีกุล", engname: "NATTAREE TECHATAWEEKUL" },
            { thainame: "ศิริรุ้ง รัศมีวงศ์พร", engname: "SIRIROONG RUSSAMEEWONGPORN" }
        ];
    }

    search() {
        //this.qadtActivitesService.defaultHeaders.append('Content-Type', 'application/json');
        //this.qadtActivitesService.defaultHeaders.append('Accept', 'application/json');

        this.qaPlans = [
            {
                "qadtActivtiesRef": 2,
                "orderSeq": 1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Create QA Plan",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 3,
                "orderSeq": 2,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Revise QA Plan",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 4,
                "orderSeq": 3,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Promote baseline",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 5,
                "orderSeq": 4,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Create QA Audit Checklist",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 6,
                "orderSeq": 5,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Revise QA Checklist",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 7,
                "orderSeq": 6,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Perform QA Audit ระบบ ABC/งวด x",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 8,
                "orderSeq": 6.1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Planning",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 9,
                "orderSeq": 6.2,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Requirement",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 10,
                "orderSeq": 6.3,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase System Design",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 11,
                "orderSeq": 6.4,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Coding & Testing",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 12,
                "orderSeq": 6.5,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase UAT & Installation",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 13,
                "orderSeq": 6.6,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Implementation",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 14,
                "orderSeq": 6.7,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Closure",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 15,
                "orderSeq": 7,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Perform QA Audit ระบบ XYZ/งวด x",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 16,
                "orderSeq": 7.1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Planning",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 17,
                "orderSeq": 7.2,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Requirement",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 18,
                "orderSeq": 7.3,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase System Design",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 19,
                "orderSeq": 7.4,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Coding & Testing",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 20,
                "orderSeq": 7.5,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase UAT & Installation",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 21,
                "orderSeq": 7.6,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Implementation",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 22,
                "orderSeq": 7.7,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "QA Audit Phase Closure",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 23,
                "orderSeq": 8,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Perform QA Re-audit",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 24,
                "orderSeq": 9,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "QA Closure Project",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 25,
                "orderSeq": 9.1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Summarize QA Report",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 26,
                "orderSeq": 9.2,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Quality Trend report",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 27,
                "orderSeq": 10,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Join Meeting",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 28,
                "orderSeq": 10.1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Kick-off Meeting",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 29,
                "orderSeq": 10.2,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Review QA Plan and Checklist Meeting",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 30,
                "orderSeq": 11,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "Document Review (Optional)",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 31,
                "orderSeq": 12,
                "prevQadtActivtiesRef": null,
                "activityLevel": 1,
                "qaActivties": "QA Consult Project",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            },
            {
                "qadtActivtiesRef": 32,
                "orderSeq": 12.1,
                "prevQadtActivtiesRef": null,
                "activityLevel": 2,
                "qaActivties": "Establish Standard Document for project",
                "versionNo": 1,
                "owner": null,
                "createBy": null,

                "updateBy": null,
                "updateDate": null
            }
        ];
    }

    /*projInfos: PritInformation[] = [];
    testSearch(){
        this.pritInformationService.defaultHeaders.append('Content-Type', 'application/json');
        this.pritInformationService.defaultHeaders.append('Accept', 'application/json');
        this.pritInformationService.pritInformationFind().subscribe((response: PritInformation[]) => this.projInfos = response);
    }*/

    selectModeOption() {
        if (this.modeOption == "edit") {
            this.disabledEditText = false;
        } else {
            this.disabledEditText = true;
        }
    }

    saveAndSendToApproveQaPlan() {

    }

    saveQaPlan() {

    }

    private display: boolean = false;
    private editQaPlan: qaPlan;
    private dialogQaPlan: qaPlan;
    private newQaActivties: string;
    private newPlanAction: number;
    showDialogEditQaActivties(qaPlan: qaPlan) {
        this.editQaPlan = qaPlan;
        this.dialogQaPlan.orderSeq = qaPlan.orderSeq;
        this.dialogQaPlan.qaActivties = qaPlan.qaActivties;
        this.dialogQaPlan.workCategory = qaPlan.workCategory;
        this.dialogQaPlan.workCategoryCode = qaPlan.workCategoryCode;
        this.dialogQaPlan.planAction = qaPlan.planAction;
        this.dialogQaPlan.planEffort = qaPlan.planEffort;
        this.dialogQaPlan.remark = qaPlan.remark;
        this.display = true;
    }

    editDialogEditQaActivities() {
        if (this.editQaPlan != null) {
            this.editQaPlan.qaActivties = this.dialogQaPlan.qaActivties;
            this.editQaPlan.workCategory = this.dialogQaPlan.workCategory;
            this.editQaPlan.workCategoryCode = this.dialogQaPlan.workCategoryCode;
            this.editQaPlan.planAction = this.dialogQaPlan.planAction;
            this.editQaPlan.planEffort = this.dialogQaPlan.planEffort;
            this.editQaPlan.remark = this.dialogQaPlan.remark;
        }

        this.editQaPlan = null;
        this.display = false;
    }

    cancelDialogEditQaActivties() {
        this.editQaPlan = null;
        this.display = false;
    }

    changeDisplayWorkCategory() {

    }

    duplicateRowQaPlan(selectedQaPlan: qaPlan) {
        let index = this.qaPlans.indexOf(selectedQaPlan);
        let duplicateOrderSeqArray = selectedQaPlan.orderSeq.toString().split('.');
        let duplicateAtLevel = duplicateOrderSeqArray.length;

        if (index + 1 < this.qaPlans.length) {
            let nextDataLevel = this.qaPlans[index + 1].orderSeq.toString().split('.').length;
            if (duplicateAtLevel < nextDataLevel) {
                console.log('Not allow duplicate');
                return;
            }
        }

        let newQaPlan: qaPlan = {};
        newQaPlan.orderSeq = selectedQaPlan.orderSeq;
        newQaPlan.qaActivties = selectedQaPlan.qaActivties;
        newQaPlan.workCategory = selectedQaPlan.workCategory;
        newQaPlan.workCategoryCode = selectedQaPlan.workCategoryCode;
        newQaPlan.planAction = selectedQaPlan.planAction;
        newQaPlan.planEffort = selectedQaPlan.planEffort;
        newQaPlan.remark = selectedQaPlan.remark;
        let v = +duplicateOrderSeqArray[duplicateAtLevel - 1];

        if (index + 1 < this.qaPlans.length) {
            let r = this.qaPlans.splice(index + 1, this.qaPlans.length - 1 - index, newQaPlan);

            let currentDataOrderSeqArray = newQaPlan.orderSeq.toString().split('.');
            v++;
            currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
            newQaPlan.orderSeq = +currentDataOrderSeqArray.join('.');

            for (let j = 0; j < r.length; j++) {
                currentDataOrderSeqArray = r[j].orderSeq.toString().split('.');
                let currentDataLevel = currentDataOrderSeqArray.length;

                if (currentDataLevel == duplicateAtLevel) {
                    v++;
                    currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
                    r[j].orderSeq = +currentDataOrderSeqArray.join('.');
                } else if (currentDataLevel > duplicateAtLevel) {
                    currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
                    r[j].orderSeq = +currentDataOrderSeqArray.join('.');
                }

                let old: qaPlan = {};
                old.orderSeq = r[j].orderSeq;
                old.qaActivties = r[j].qaActivties;
                old.workCategory = r[j].workCategory;
                old.workCategoryCode = r[j].workCategoryCode;
                old.planAction = r[j].planAction;
                old.planEffort = r[j].planEffort;
                old.remark = r[j].remark;

                this.qaPlans.push(old);
            }
        } else {
            let currentDataOrderSeqArray = newQaPlan.orderSeq.toString().split('.');
            v++;
            currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
            newQaPlan.orderSeq = +currentDataOrderSeqArray.join('.');
            this.qaPlans.push(newQaPlan);
        }
    }

    deleteRowQaPlan(qaPlan: qaPlan) {
        let c = confirm('ยืนยันการลบ');
        if (!c) {
            return;
        }

        let index = -1;
        index = this.qaPlans.indexOf(qaPlan);
        console.log('Delete select index=' + index);
        let deleteAtLevel = qaPlan.orderSeq.toString().split('.').length;
        let deleteOrderSeq = qaPlan.orderSeq.toString();

        if (index + 1 < this.qaPlans.length) {
            let nextDataLevel = this.qaPlans[index + 1].orderSeq.toString().split('.').length;
            if (deleteAtLevel < nextDataLevel) {
                console.log('Not allow delete');
                return;
            }
        }

        if (deleteAtLevel > 1) {
            let prevDataLevel = this.qaPlans[index - 1].orderSeq.toString().split('.').length;
            let nextDataLevel = this.qaPlans[index + 1].orderSeq.toString().split('.').length;
            if (deleteAtLevel > prevDataLevel) {
                if (deleteAtLevel > nextDataLevel) {
                    console.log('Not allow delete');
                    return;

                } else if (deleteAtLevel < nextDataLevel) {
                    console.log('Not allow delete');
                    return;
                }
            }
        }

        this.qaPlans.splice(index, 1); //Delete

        if (deleteAtLevel == 1) {
            let deleteOrderSeqArray = deleteOrderSeq.split('.');
            let v = +deleteOrderSeqArray[deleteAtLevel - 1];
            let firstTimeIf = true;

            for (let i = index; i < this.qaPlans.length; i++) {
                let currentDataLevel = this.qaPlans[i].orderSeq.toString().split('.').length;
                if (currentDataLevel == deleteAtLevel) {
                    let currentDataOrderSeqArray = this.qaPlans[i].orderSeq.toString().split('.');
                    if (firstTimeIf) { //ไม่เลื่อนค่า
                        firstTimeIf = false;
                    } else {
                        v++;
                    }

                    currentDataOrderSeqArray[deleteAtLevel - 1] = v.toString();
                    this.qaPlans[i].orderSeq = +currentDataOrderSeqArray.join('.');

                } else if (currentDataLevel > deleteAtLevel) {
                    let currentDataOrderSeqArray = this.qaPlans[i].orderSeq.toString().split('.');
                    currentDataOrderSeqArray[deleteAtLevel - 1] = v.toString();
                    this.qaPlans[i].orderSeq = +currentDataOrderSeqArray.join('.');
                }
            }
        } else {
            let deleteOrderSeqArray = deleteOrderSeq.split('.');
            let v = +deleteOrderSeqArray[deleteAtLevel - 1];
            let firstTimeIf = true;

            for (let i = index; i < this.qaPlans.length; i++) {
                let currentDataLevel = this.qaPlans[i].orderSeq.toString().split('.').length;
                if (currentDataLevel < deleteAtLevel) {
                    break;

                } else if (currentDataLevel == deleteAtLevel) {
                    let currentDataOrderSeqArray = this.qaPlans[i].orderSeq.toString().split('.');
                    if (firstTimeIf) { //ไม่เลื่อนค่า
                        firstTimeIf = false;
                    } else {
                        v++;
                    }

                    currentDataOrderSeqArray[deleteAtLevel - 1] = v.toString();
                    this.qaPlans[i].orderSeq = +currentDataOrderSeqArray.join('.');

                } else if (currentDataLevel > deleteAtLevel) {
                    let currentDataOrderSeqArray = this.qaPlans[i].orderSeq.toString().split('.');
                    currentDataOrderSeqArray[deleteAtLevel - 1] = v.toString();
                    this.qaPlans[i].orderSeq = +currentDataOrderSeqArray.join('.');
                }
            }
        }
    }

    ngOnDestroy() {
        if(this.pritInformation){
            this.pritInformation.unsubscribe();
        }
    }
}
