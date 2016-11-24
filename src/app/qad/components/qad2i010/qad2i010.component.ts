import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';

interface SearchCondition {
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
    private menus: Option[];
    private selectedMenu: string;
    private searchCondition: SearchCondition;
    private documentCMMIType: Array<any> = [];
    private templateCMMIItems: MenuItem[] = [];
    private statusSystemDocuments: Array<any> = [];

    constructor(private http: Http,
        private router: Router,
        private locale: ThaiCalendarService,
        private qadConstant: QadConstantsService) {
            this.menus = [];
            this.menus.push({label: 'History', value: '/qad/QAD2Q010'});
            this.menus.push({label: 'CMMI Document', value: '/qad/QAD2I010'});
            this.documentCMMIType = qadConstant.documentCMMIType;
        }

    ngOnInit() {
        this.selectedMenu = this.router.url;
        this.searchCondition = {};
        this.searchProjCode = {};
        this.templateCMMIItems = [];
        this.documentCMMIType.map((v) => {
            let n: MenuItem = {};
            n.label = v.label;
            n.icon = 'fa fa-plus-circle';
            this.templateCMMIItems.push(n);
        });
    }

    nav() {
        this.router.navigate([this.selectedMenu]);
    }

    private searchProjCode: SearchProjCode;
    private selectedProj: any;
    private resultSearchProjects: Array<any> = [];
    private displaySearchProjCode: boolean = false;
    showDialogSearchProjCode(projCode: string) {
        this.selectedProj = null;
        this.searchProjCode.projCode = projCode;
        //this.searchByProjCode();
        this.displaySearchProjCode = true;
    }

    onRowSelectProj() {
        this.searchCondition.projCode = this.selectedProj.projCode;
        this.searchCondition.projName = this.selectedProj.projName;
        this.selectedProj = undefined;
        this.displaySearchProjCode = false;
    }

    searchByProjCode() {
        if (this.searchProjCode !== undefined && this.searchProjCode.projCode !== undefined && this.searchProjCode.projCode.trim() !== '') {
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    this.resultSearchProjects = projs.filter((proj) => proj.projCode === this.searchCondition.projCode.trim());
                });
        } else {
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    this.resultSearchProjects = projs;
                });
        }
    }

    clearTextProjName() {
        this.searchCondition.projName = ''
    }


}
