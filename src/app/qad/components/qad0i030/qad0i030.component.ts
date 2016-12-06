import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { QadConstantsService } from '../../constants';

import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Qad0i030SaveComponent } from '../../components/qad0i030-save/qad0i030-save.component';

@Component({
    selector: 'app-qad0i030',
    templateUrl: './qad0i030.component.html',
    styleUrls: ['./qad0i030.component.css'],
    providers: [QadConstantsService]
})
export class Qad0i030Component implements OnInit {
    private _selectedCMMITemplate: any;
    private CMMITemplateDatas: any[] = [];
    private documentCMMIType: any[] = [];
    private templateCMMIItems: MenuItem[] = [];
    private isCreateMasterTemplateCMMI: boolean = false;

    constructor(private qadConstant: QadConstantsService) {
        this.documentCMMIType = qadConstant.groupDocumentCMMIType;
    }

    ngOnInit() {
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
    }


    private set selectedCMMITemplate(label: string) {
        this.isCreateMasterTemplateCMMI = true;
        if (label === 'LOADING') {
            this._selectedCMMITemplate = LoadingComponent;
        } else {
            let item = this.documentCMMIType.filter((item) => item.label === label);
            let type = item[0].value.toString();
            this.CMMITemplateDatas = [{ documentType: type, documentName: label, value: [] }];
            this._selectedCMMITemplate = Qad0i030SaveComponent;
        }
    }

    private get selectedCMMITemplate() {
        return this._selectedCMMITemplate;
    }

    onSaveCMMITemplate(value: any) {
        console.log('--Todo--onSaveCMMITemplate--');
        console.log(value);
        let isSave = value[0].isSave;
        if (isSave) {
            //Save to master template database <== Todo
        }

        this.isCreateMasterTemplateCMMI = false;
    }
}
