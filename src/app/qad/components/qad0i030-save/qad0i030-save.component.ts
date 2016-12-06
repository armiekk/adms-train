import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Qad0i030TableComponent } from '../qad0i030-table/qad0i030-table.component';

@Component({
    selector: 'app-qad0i030-save',
    templateUrl: './qad0i030-save.component.html',
    styleUrls: ['./qad0i030-save.component.css']
})
export class Qad0i030SaveComponent implements OnInit {
    @Output() onSave = new EventEmitter<any>();
    private masterDocumentType: number;
    private masterDocumentName: string;
    private masterGroupName: string;
    private headerTables: any[] = [{}];
    private documentChecks: Array<{ header: string, value: any }> = [];
    private documentCheckDatas: any[] = [];
    private _selectedTab: any;
    private _qaDatas: any[] = [];

    constructor() { }

    ngOnInit() {
    }

    private set qaDatas(qaDatas: any[]) {
        this._qaDatas = qaDatas;
        this.masterDocumentType = this._qaDatas[0].documentType;
        this.masterDocumentName = this._qaDatas[0].documentName;
        this.documentChecks = this._qaDatas[0].value;
    }

    saveCMMI() {
        let isPass = true;
        let value = this.documentChecks;
        for (let i = 0; i < value.length; i++) {
            let docValue = this.documentChecks[i].value;
            for (let j = 0; j < docValue.length; j++) {
                if (docValue[j].documentCheckName === '') {
                    isPass = false;
                    alert('โปรดระบุชื่อเอกสารด้วย');
                    break;
                }
            }
        }

        if (isPass) {
            this._qaDatas[0].isSave = true;
            this.onSave.emit(this._qaDatas);
        }
    }

    cancelCMMI() {
        this.documentChecks = [];
        console.log(this._qaDatas);
        this._qaDatas[0].isSave = false;
        this.onSave.emit(this._qaDatas);
    }

    private displayNewPhase: boolean = false;
    private newPhaseName: string;
    showDialogAddNewPhase() {
        this.newPhaseName = '';
        this.displayNewPhase = true;
    }

    saveNewPhaseName() {
        let length = this.documentChecks.push({ header: this.newPhaseName, value: [] });
        this.documentChecks[length - 1].value.push({ newRowData: true, phaseType: this.newPhaseName, orderSeq: '1', documentCheckName: '', send: true, remark: '' });
        this.selectedTab = 'LOADING';
        setTimeout(() => {
            this.selectedTab = '';
        }, 100);
        this.displayNewPhase = false;
    }

    cancelNewPhaseName() {
        this.displayNewPhase = false;
    }

    private displayDeletePhase: boolean = false;
    private phases: any[] = [];
    private selectPhase: any;
    showDialogDeletePhase() {
        this.selectPhase = null;
        let index = 0;
        this.phases = this.documentChecks.map((v) => {
            return { label: v.header, value: index++ };
        });
        this.phases.unshift({ label: 'เลือก Phase', value: null });
        this.displayDeletePhase = true;
        console.log(this.phases);
    }

    deletePhaseName() {
        if (this.selectPhase !== null) {
            this.documentChecks.splice(this.selectPhase, 1);
            this.selectedTab = 'LOADING';
            setTimeout(() => {
                this.selectedTab = '';
            }, 100);
            this.displayDeletePhase = false;
        } else {
            alert('โปรดเลือก Phase');
        }
    }

    cancelDeletePhaseName() {
        this.displayDeletePhase = false;
    }

    private set selectedTab(tabLabel: string) {
        if (tabLabel === 'LOADING') {
            this._selectedTab = LoadingComponent;
        } else {
            this.documentCheckDatas = this.documentChecks;
            this._selectedTab = Qad0i030TableComponent;
        }
    }

    private get selectedTab() {
        return this._selectedTab;
    }
}
