import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { PritInformation } from '../../api/prit-information/model/PritInformation';
import { EmptProjectManager } from '../../api/empt-project-manager/model/EmptProjectManager';

import { PritInformationApi } from '../../api/prit-information/api/PritInformationApi';

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

const INDENT_MULTIPLIER: number = 0.7;

@Component({
    selector: 'app-qad1q010',
    templateUrl: './qad1q010.component.html',
    styleUrls: ['./qad1q010.component.css'],
    providers: [ThaiCalendarService, PritInformationApi]
})
export class Qad1q010Component implements OnInit {
    private menus: Option[];
    private selectedMenu: string;
    private searchCondition: SearchCondition;
    private historys: Array<any> = [];
    private qaSchedulesAll: Array<any> = [];
    private qaSchedules: Array<any> = [];
    private qaPlansAll: Array<any> = [];
    private qaPlans: Array<any> = [];

    private isSelectedSite: boolean = false;
    private searchProjCode: SearchProjCode;
    private selectedProj: any;
    private resultSearchProjects: Array<any> = [];

    constructor(private locale: ThaiCalendarService,
        private pritInformationService: PritInformationApi,
        private http: Http,
        private router: Router) {
        this.menus = [];
        this.menus.push({ label: 'Assign QA', value: '/qad/QAD1I030' });
        this.menus.push({ label: 'QA Schedule and Plan', value: '/qad/QAD1Q010' });
    }

    ngOnInit() {
        this.selectedMenu = this.router.url;
        this.searchCondition = {};
        this.searchProjCode = {};
    }

    nav() {
        this.router.navigate([this.selectedMenu]);
    }

    
    displaySearchProjCode: boolean = false;
    showDialogSearchProjCode(projCode: string) {
        this.selectedProj = null;
        this.searchProjCode.projCode = projCode;
        this.searchByProjCode();
        this.displaySearchProjCode = true;
    }

    onRowSelectProj() {
        this.searchCondition.projCode = this.selectedProj.projCode;
        this.searchCondition.projName = this.selectedProj.projName;

        if (!this.isSelectedSite) {
            let projSiteCode = this.selectedProj.projSiteCode;
            this.http.get('app/qad/resources/data/sitesMockData.json')
                .map(res => res.json().data)
                .subscribe((sites) => {
                    this.resultSearchSites = sites.filter((site) => site.siteCode === projSiteCode);
                    if (this.resultSearchSites.length === 1) {
                        this.searchCondition.projSiteCode = this.resultSearchSites[0].siteCode;
                        this.searchCondition.projSiteName = this.resultSearchSites[0].siteName;
                    }
                });
        }

        this.selectedProj = undefined;
        this.displaySearchProjCode = false;
    }

    searchByProjCode() {
        if (this.isSelectedSite) {
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    this.resultSearchProjects = projs.filter((proj) => proj.projSiteCode === this.searchCondition.projSiteCode);
                })
        } else {
            if (this.searchProjCode !== undefined && this.searchProjCode.projCode !== undefined && this.searchProjCode.projCode.trim() !== '') {
                this.http.get('app/qad/resources/data/projectsMockData.json')
                    .map(res => res.json().data)
                    .subscribe((projs) => {
                        this.resultSearchProjects = projs.filter((proj) => proj.projCode === this.searchCondition.projCode.trim());
                    })
            } else {
                this.http.get('app/qad/resources/data/projectsMockData.json')
                    .map(res => res.json().data)
                    .subscribe((projs) => {
                        this.resultSearchProjects = projs;
                    })
            }
        }
    }

    clearTextProjName() {
        this.searchCondition.projName = ''
    }

    private searchSiteCode: string;
    private searchSiteName: string;
    private selectedSite: any;
    private resultSearchSites: Array<any>;
    private displaySearchSite: boolean = false;
    showDialogSearchSite(siteCode: string) {
        this.selectedSite = null;
        this.searchSiteCode = siteCode;
        this.searchBySite();
        this.displaySearchSite = true;
    }

    onRowSelectSite() {
        this.searchCondition.projSiteCode = this.selectedSite.siteCode;
        this.searchCondition.projSiteName = this.selectedSite.siteName;
        this.isSelectedSite = true;
        this.showDialogSearchProjCode('');
        this.selectedSite = undefined;
        this.displaySearchSite = false;
    }

    clearTextSiteName() {
        this.isSelectedSite = false;
        this.searchCondition.projSiteName = ''
    }

    searchBySite() {
        if (this.searchSiteCode !== undefined && this.searchSiteCode.trim() !== '') {
            this.http.get('app/qad/resources/data/sitesMockData.json')
                .map(res => res.json().data)
                .subscribe((sites) => {
                    this.resultSearchSites = sites.filter((site) => site.siteCode === this.searchSiteCode.trim());
                });
        } else {
            this.http.get('app/qad/resources/data/sitesMockData.json')
                .map(res => res.json().data)
                .subscribe((sites) => {
                    this.resultSearchSites = sites;
                });
        }
    }

    private findHeaderName: string;
    private optionSearchEmp: number;
    private searchEmp: string;
    private selectedEmp: Emp;
    private resultSearchEmps: Emp[];
    private displaySearchEmp: boolean = false;
    showDialogSearchEmp(empName: string, option: number) {
        this.selectedEmp = null;
        this.searchEmp = empName;
        this.optionSearchEmp = option;
        this.searchByEmp();
        let inCaseDefault: boolean = false;

        switch (this.optionSearchEmp) {
            case 1:
                //Project Manager
                this.findHeaderName = 'Project Manager';
                break;
            case 2:
                //Senior Manager
                this.findHeaderName = 'Senior Manager';
                break;
            case 3:
                //QA Manager
                this.findHeaderName = 'QA Manager';
                break;
            case 4:
                //Create By (QA)
                this.findHeaderName = 'Create By (QA)';
                break;
            default:
                inCaseDefault = true;
        }

        this.displaySearchEmp = (inCaseDefault) ? false : true;
    }

    onRowSelectEmp() {
        switch (this.optionSearchEmp) {
            case 1:
                // Project Manager
                this.searchCondition.projManager = this.selectedEmp.thainame;
                break;
            case 2:
                // Senior Manager
                this.searchCondition.projSeniorManager = this.selectedEmp.thainame;
                break;
            case 3:
                // QA Manager
                this.searchCondition.projQAManager = this.selectedEmp.thainame;
                break;
            case 4:
                // Create By (QA)
                this.searchCondition.projCreateByQA = this.selectedEmp.thainame;
                break;
            default:
        }

        this.selectedEmp = undefined;
        this.displaySearchEmp = false;
    }

    searchByEmp() {
        switch (this.optionSearchEmp) {
            case 1:
                // Project Manager
                /* this.emptProjectManagerService.defaultHeaders.append('Content-Type', 'application/json');
                this.emptProjectManagerService.defaultHeaders.append('Accept', 'application/json');
                if (this.searchEmp !== undefined && this.searchEmp.trim() !== '') {
                    this.emptProjectManagerService.emptProjectManagerFindByName(this.searchEmp.trim()).subscribe((response: EmptProjectManager[]) => this.resultSearchEmps = response);
                } else {
                    this.emptProjectManagerService.emptProjectManagerFind().subscribe((response: EmptProjectManager[]) => this.resultSearchEmps = response);
                } */
                this.resultSearchEmps = [
                    { thainame: 'กมลศักดิ์ อิทธิฤกษ์มงคล', engname: 'KAMONSAK ITTIRUEGMONGKON' },
                    { thainame: 'กำพล หาญนฤชัย', engname: 'KAMPON HANNARUECHAI' },
                    { thainame: 'เกศมณี คุ้มสาธิต', engname: 'KATEMANEE KHOOMSATHIT' },
                    { thainame: 'เกียรติชัย สิวลีธนโชค', engname: 'KIATICHAI SIWALEETHANACHOK' },
                    { thainame: 'จารุมาศ ตีระสหกุล', engname: 'CHARUMAS TEERASAHAKUL' },
                    { thainame: 'จำนงค์ ขจรเดชะ', engname: 'CHAMNONG KHACHONDACHA' },
                    { thainame: 'ชนิดา เลาหพิสิฐพาณิชย์', engname: 'CHANIDA LAOHAPISITPANICH' },
                    { thainame: 'ชินวุธ มณีสาคร', engname: 'CHINWUT MANEESACORN' },
                    { thainame: 'ชูศักดิ์ ปรมานุรักษ์', engname: 'CHUSAK PARAMANURAK' },
                    { thainame: 'เดชา ศุกระแพทย์', engname: 'DACHA SUKRAPHATTYA' },
                    { thainame: 'ทศพร พุทธศุภะ', engname: 'THODSAPORN PHUTTASUPA' },
                    { thainame: 'ธนา เกษะประกร', engname: 'THANA KASAPRAGORN' },
                    { thainame: 'ธีรยุทธ์ ฟุ้งเกียรติไพบูลย์', engname: 'TEERAYUT FUNGKIATPAIBOOL' },
                    { thainame: 'ปภินวิช วสุภัทรภิญโญ', engname: 'PAPHINWICH VASUPHATRAPHINYO' },
                    { thainame: 'ประไพลักษณ์ วรยศโกวิท', engname: 'PRAPAILUK WORRAYOTKOVIT' },
                    { thainame: 'พงษ์ศักดิ์ จิรโพธิ์ทอง', engname: 'PONGSAK JIRAPHOTHONG' },
                    { thainame: 'ไพศาล โชคพิพัฒน์ทวี', engname: 'PAISAN CHOKPIPATTAWEE' },
                    { thainame: 'มนชิดา โชติเสน', engname: 'MONCHIDA CHOTISEN' },
                    { thainame: 'วรเมธ วัชระบัณฑูรย์', engname: 'WORAMET WATCHARABUNTOON' },
                    { thainame: 'วิจิตร ธเนศานุรักษ์', engname: 'WIJIT THANESANURAK' },
                    { thainame: 'ศราวุฒ ศิริอุดม', engname: 'SARAWUT SIRIUDOM' },
                    { thainame: 'สมพร นาควงษ์', engname: 'SOMPORN NAKWONG' },
                    { thainame: 'สมศักดิ์ ชาญชัยรุจิรา', engname: 'SOMSAK CHANCHAIRUJIRA' },
                    { thainame: 'สุรชัย สถาพรวัฒนายนต์', engname: 'SURACHAI SATHAPORNWATTANAYONT' },
                    { thainame: 'สุรพล เรืองรอง', engname: 'SURAPOL RUENGRONG' },
                    { thainame: 'สุรินทร์ อึงนิยม', engname: 'SURIN OUNGNIYOM' },
                    { thainame: 'สุวรรณ อินยิน', engname: 'SUWAN INYIN' },
                    { thainame: 'อนุชา โชติวัฒนดิลก', engname: 'ANUCHA CHOTWATTANADILOK' },
                    { thainame: 'อัมรินทร์ สังขรัตน์', engname: 'AMARIN SANGKARAT' },
                    { thainame: 'อัศวิน อินทร์แนม', engname: 'ADSAWIN INNAEM' }
                ];
                break;
            case 2:
                // Senior Manager
                this.resultSearchEmps = [
                    { thainame: 'นางพัชรวรรณ ทันอินทรอาจ', engname: 'PATCHARAWAN TANINTARAARJ' },
                    { thainame: 'นางวันเพ็ญ กาญจนประพิณ', engname: 'WANPEN KANCHANAPRAPIN' },
                    { thainame: 'นายกฤษฎา รักษ์งาน', engname: 'KRISADA RUKNGAN' }
                ];
                break;
            case 3:
                // QA Manager
                this.resultSearchEmps = [
                    { thainame: 'ประไพลักษณ์ วรยศโกวิท', engname: 'PRAPAILUK WORRAYOTKOVIT' }
                ];
                break;
            case 4:
                // Create By (QA)
                this.resultSearchEmps = [
                    { thainame: 'ณัฐรี เตชะทวีกุล', engname: 'NATTAREE TECHATAWEEKUL' },
                    { thainame: 'ศิริรุ้ง รัศมีวงศ์พร', engname: 'SIRIROONG RUSSAMEEWONGPORN' }
                ];
                break;
            default:
        }
    }

    search() {
        this.http.get('app/qad/resources/data/historysMockData.json')
            .map(res => res.json().data)
            .subscribe((historys: Array<any>) => {
                this.historys = historys.filter((history) => history.projCode === this.searchCondition.projCode);
                let lastVersion;
                for (let i = 0; i < this.historys.length; i++) {
                    let date = new Date(this.historys[i].date);
                    this.historys[i].showDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

                    if (i === 0) {
                        lastVersion = this.historys[i].version;
                    } else {
                        if (lastVersion < this.historys[i].version) {
                            lastVersion = this.historys[i].version
                        }
                    }
                }

                if (this.historys.length > 0) {
                    this.http.get('app/qad/resources/data/qaSchedulesMockData.json')
                        .map(res => res.json().data)
                        .subscribe((qaSchedules: Array<any>) => {
                            this.qaSchedulesAll = qaSchedules.filter((qaSchedule) => qaSchedule.projCode === this.searchCondition.projCode);
                            this.qaSchedules = this.qaSchedulesAll.filter((qaSchedule: any) => qaSchedule.version === lastVersion);
                            for (let i = 0; i < this.qaSchedules.length; i++) {
                                this.qaSchedules[i].orderSeq = i.toString();
                                let indent = this.qaSchedules[i].activityLevel * INDENT_MULTIPLIER;
                                this.qaSchedules[i].indent = indent + 'em';
                                if (this.qaSchedules[i].activityLevel === 0) {
                                    this.qaSchedules[i].hidden = true;
                                }
                            }
                        });

                    this.http.get('app/qad/resources/data/qaPlansMockData.json')
                        .map(res => res.json().data)
                        .subscribe((qaPlans: Array<any>) => {
                            this.qaPlansAll = qaPlans.filter((qaPlan) => qaPlan.projCode === this.searchCondition.projCode);
                            this.qaPlans = this.qaPlansAll.filter((qaPlan: any) => qaPlan.version === lastVersion);
                            if (this.qaPlans.length === 0) {
                                this.http.get('app/qad/resources/data/qaActivitiesMockData.json')
                                    .map(res => res.json().data)
                                    .subscribe((qaActivities: Array<any>) => {
                                        for (let i = 0; i < qaActivities.length; i++) {
                                            qaActivities[i].workCategory = 'Audit';
                                            qaActivities[i].workCategoryCode = 1;
                                            qaActivities[i].planAction = 1;
                                        }

                                        this.qaPlansAll.push(qaActivities);
                                        this.qaPlans = qaActivities;
                                    });
                            }
                        });

                } else {
                    console.log('else historys');

                }
            });
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

    }

    private selectedHistory: any;
    onRowSelectHistory() {
        this.qaSchedules = this.qaSchedulesAll.filter((qaSchedule: any) => qaSchedule.version === this.selectedHistory.version);
        for (let i = 0; i < this.qaSchedules.length; i++) {
            this.qaSchedules[i].orderSeq = i.toString();
            let indent = this.qaSchedules[i].activityLevel * INDENT_MULTIPLIER;
            this.qaSchedules[i].indent = indent + 'em';
            if (this.qaSchedules[i].activityLevel === 0) {
                this.qaSchedules[i].hidden = true;
            }
        }

        this.qaPlans = this.qaPlansAll.filter((qaPlan: any) => qaPlan.version === this.selectedHistory.version);
    }
}
