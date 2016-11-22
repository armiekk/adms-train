import { Component, OnInit, Input } from '@angular/core';
import { TreeNode, SharedModule } from 'primeng/primeng';

import { PritInformation } from '../../api/prit-information/model/PritInformation';

import { QadtActivtiesApi } from '../../api/qadt-activities/api/QadtActivtiesApi';
import { PritInformationApi } from '../../api/prit-information/api/PritInformationApi';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';

interface SearchProjCode {
    projCode?: string;
    projName?: string;
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
export class Qad1i010Component implements OnInit {
    private projVersionDate: Date;
    private projVersion: string;
    @Input() qaPlans: Array<any>;

    constructor(private locale: ThaiCalendarService,
                private qadtActivitesService: QadtActivtiesApi,
                private qadConstant: QadConstantsService,
                private pritInformationService: PritInformationApi) {
    }

    ngOnInit() {
        this.dialogQaPlan = {};
        this.projVersionDate = new Date();
        this.projVersion = "1.0";
    }

    private display: boolean = false;
    private editQaPlan: any;
    private dialogQaPlan: any;
    private newQaActivities: string;
    private newPlanAction: number;
    showDialogEditQaActivities(qaPlan: any) {
        this.editQaPlan = qaPlan;
        this.dialogQaPlan.orderSeq = qaPlan.orderSeq;
        this.dialogQaPlan.qaActivities = qaPlan.qaActivities;
        this.dialogQaPlan.workCategory = qaPlan.workCategory;
        this.dialogQaPlan.workCategoryCode = qaPlan.workCategoryCode;
        this.dialogQaPlan.planAction = qaPlan.planAction;
        this.dialogQaPlan.planEffort = qaPlan.planEffort;
        this.dialogQaPlan.remark = qaPlan.remark;
        this.display = true;
    }

    editDialogEditQaActivities() {
        if (this.editQaPlan != null) {
            this.editQaPlan.qaActivities = this.dialogQaPlan.qaActivities;
            this.editQaPlan.workCategory = this.dialogQaPlan.workCategory;
            this.editQaPlan.workCategoryCode = this.dialogQaPlan.workCategoryCode;
            this.editQaPlan.planAction = this.dialogQaPlan.planAction;
            this.editQaPlan.planEffort = this.dialogQaPlan.planEffort;
            this.editQaPlan.remark = this.dialogQaPlan.remark;
        }

        this.editQaPlan = null;
        this.display = false;
    }

    cancelDialogEditQaActivities() {
        this.editQaPlan = null;
        this.display = false;
    }

    changeDisplayWorkCategory() {

    }

    duplicateRowQaPlan(selectedQaPlan: any) {
        let index = this.qaPlans.indexOf(selectedQaPlan);
        let duplicateOrderSeqArray = selectedQaPlan.orderSeq.toString().split('.');
        let duplicateAtLevel = duplicateOrderSeqArray.length;
        let v = +duplicateOrderSeqArray[duplicateAtLevel - 1];
        let endIndex: number = index;
        if (index + 1 < this.qaPlans.length) {
            //collect data
            for (let i = index + 1; i < this.qaPlans.length; i++) {
                let currentDataOrderSeqArray = this.qaPlans[i].orderSeq.toString().split('.');
                let currentDataLevel = currentDataOrderSeqArray.length;

                if (currentDataLevel > duplicateAtLevel) {
                    endIndex = i;
                } else {
                    break;
                }
            }

            let c = this.qaPlans.slice(index, endIndex + 1);
            let r: Array<any> = [];
            if (endIndex + 1 < this.qaPlans.length) {
                r = this.qaPlans.splice(endIndex + 1, this.qaPlans.length - 1 - endIndex);
            }
            
            if (c.length > 0) {
                v++;
            }

            for (let i = 0; i < c.length; i++) {
                let currentDataOrderSeqArray = c[i].orderSeq.toString().split('.');
                currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();

                let old: any = {};
                old.orderSeq = currentDataOrderSeqArray.join('.');
                old.qaActivities = c[i].qaActivities;
                old.workCategory = c[i].workCategory;
                old.workCategoryCode = c[i].workCategoryCode;
                old.planAction = c[i].planAction;
                old.planEffort = c[i].planEffort;
                old.remark = c[i].remark;

                this.qaPlans.push(old);
            }

            let outLevel = false;
            for (let i = 0; i < r.length; i++) {
                let currentDataOrderSeqArray = r[i].orderSeq.toString().split('.');
                let currentDataLevel = currentDataOrderSeqArray.length;
                if (currentDataLevel === duplicateAtLevel) {
                    if (!outLevel) {
                        v++;
                        currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
                    }
                } else if (currentDataLevel > duplicateAtLevel) {
                    currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
                } else {
                    outLevel = true;
                }

                let old: any = {};
                old.orderSeq = currentDataOrderSeqArray.join('.');
                old.qaActivities = r[i].qaActivities;
                old.workCategory = r[i].workCategory;
                old.workCategoryCode = r[i].workCategoryCode;
                old.planAction = r[i].planAction;
                old.planEffort = r[i].planEffort;
                old.remark = r[i].remark;

                this.qaPlans.push(old);
            }

        } else {
            let newQaPlan: any = {};
            newQaPlan.orderSeq = selectedQaPlan.orderSeq;
            newQaPlan.qaActivities = selectedQaPlan.qaActivities;
            newQaPlan.workCategory = selectedQaPlan.workCategory;
            newQaPlan.workCategoryCode = selectedQaPlan.workCategoryCode;
            newQaPlan.planAction = selectedQaPlan.planAction;
            newQaPlan.planEffort = selectedQaPlan.planEffort;
            newQaPlan.remark = selectedQaPlan.remark;

            let currentDataOrderSeqArray = newQaPlan.orderSeq.toString().split('.');
            v++;
            currentDataOrderSeqArray[duplicateAtLevel - 1] = v.toString();
            newQaPlan.orderSeq = currentDataOrderSeqArray.join('.');
            this.qaPlans.push(newQaPlan);
        }
    }

    deleteRowQaPlan(qaPlan: any) {
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
}
