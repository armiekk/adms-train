import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-qad2i010-table',
    templateUrl: './qad2i010-table.component.html',
    styleUrls: ['./qad2i010-table.component.css']
})
export class Qad2i010TableComponent implements OnInit {
    private documentChecks: any[] = [];

    constructor() { }

    ngOnInit() {
    }

    private set qaDatas(qaDatas: any[]) {
        this.documentChecks = qaDatas;
    }

    duplicateRowData(i: number, data: any) {
        let index = -1;
        index = this.documentChecks[i].value.indexOf(data);
        let orderSeq = +this.documentChecks[i].value[index].orderSeq;
        orderSeq++;
        let newData: any = {};
        newData.orderSeq = orderSeq.toString();
        newData.documentCheckName = this.documentChecks[i].value[index].documentCheckName;
        newData.send = this.documentChecks[i].value[index].send;
        newData.remark = this.documentChecks[i].value[index].remark;
        if (index + 1 < this.documentChecks[i].value.length) {
            let r = this.documentChecks[i].value.splice(index + 1, this.documentChecks[i].value.length - 1 - index, newData);
            for (let j = 0;j < r.length; j++) {
                orderSeq++;
                let old: any = {};
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

    private displayDialog: boolean = false;
    private dialogCMMI: any = {};
    private editCMMI: any = {};
    showDialogEditCMMI(data: any) {
        this.editCMMI = data;
        this.dialogCMMI.orderSeq = data.orderSeq;
        this.dialogCMMI.documentCheckName = data.documentCheckName;
        this.dialogCMMI.send = data.send;
        this.dialogCMMI.remark = data.remark;
        this.displayDialog = true;
    }

    editDialogEditCMMI() {
        if (this.editCMMI !== null) {
            this.editCMMI.orderSeq = this.dialogCMMI.orderSeq;
            this.editCMMI.documentCheckName = this.dialogCMMI.documentCheckName;
            this.editCMMI.send = this.dialogCMMI.send;
            this.editCMMI.remark = this.dialogCMMI.remark;
        }

        this.editCMMI = null;
        this.displayDialog = false;
    }

    cancelDialogEditCMMI() {
        this.editCMMI = null;
        this.displayDialog = false;
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
