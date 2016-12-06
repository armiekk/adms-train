import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-qad0i030-table',
    templateUrl: './qad0i030-table.component.html',
    styleUrls: ['./qad0i030-table.component.css']
})
export class Qad0i030TableComponent implements OnInit {
    private documentChecks: any[] = [];

    constructor() { }

    ngOnInit() {
    }

    private set qaDatas(qaDatas: any[]) {
        this.documentChecks = qaDatas;
    }

    addNewRowData(i: number) {
        let phaseType = this.documentChecks[i].header;
        let valueLength = this.documentChecks[i].value.length;
        if (valueLength > 0) {
            let orderSeq = +this.documentChecks[i].value[valueLength - 1].orderSeq;
            orderSeq++;
            this.documentChecks[i].value.push({ newRowData: true, phaseType: phaseType, orderSeq: orderSeq.toString(), documentCheckName: '', send: true, remark: '' });
        } else {
            this.documentChecks[i].value.push({ newRowData: true, phaseType: phaseType, orderSeq: '1', documentCheckName: '', send: true, remark: '' });
        }
    }

    duplicateRowData(i: number, data: any) {
        let index = -1;
        index = this.documentChecks[i].value.indexOf(data);
        let orderSeq = +this.documentChecks[i].value[index].orderSeq;
        orderSeq++;
        let newData: any = {};
        newData.phaseType = this.documentChecks[i].header;
        newData.orderSeq = orderSeq.toString();
        newData.documentCheckName = this.documentChecks[i].value[index].documentCheckName;
        newData.send = this.documentChecks[i].value[index].send;
        newData.remark = this.documentChecks[i].value[index].remark;
        if (index + 1 < this.documentChecks[i].value.length) {
            let r = this.documentChecks[i].value.splice(index + 1, this.documentChecks[i].value.length - 1 - index, newData);
            for (let j = 0;j < r.length; j++) {
                orderSeq++;
                let old: any = {};
                old.phaseType = r[j].phaseType;
                old.orderSeq = orderSeq.toString();
                old.documentCheckName = r[j].documentCheckName;
                old.send = r[j].send;
                old.remark = r[j].remark;

                this.documentChecks[i].value.push(old);
            }
        } else {
            this.documentChecks[i].value.push(newData);
        }
    }

    editRowData(data: any) {
        data.tmpDocumentCheckName = data.documentCheckName;
        data.edit = true;
    }

    saveRowData(data: any) {
        if (data.documentCheckName !== undefined && data.documentCheckName !== '') {
            data.edit = false;
            data.newRowData = false;
        } else {
            alert('โปรดระบุชื่อเอกสารด้วย');
        }
        
    }

    cancelEditRowData(data: any) {
        data.documentCheckName = data.tmpDocumentCheckName;
        data.edit = false;
    }

    deleteRowData(i: number, data: any) {
        let index = -1;
        index = this.documentChecks[i].value.indexOf(data);
        let orderSeq = +this.documentChecks[i].value[index].orderSeq;

        this.documentChecks[i].value.splice(index, 1);
        for (let j = index; j < this.documentChecks[i].value.length; j++) {
            this.documentChecks[i].value[j].orderSeq = orderSeq;
            orderSeq++;
        }
    }
}
