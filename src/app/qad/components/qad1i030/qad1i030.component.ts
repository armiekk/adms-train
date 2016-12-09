import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SelectItem, Message } from 'primeng/primeng';

import { QadConstantsService } from '../../constants';
import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';

interface SearchCondition {
    projType?: number;
    projCode?: string;
    projName?: string;
    projSiteCode?: string;
    projSiteName?: string;
    projManager?: string;
    projReceivePlanDate?: Date;
    projResponsibleQaName?: string;
}

interface SearchProjCode {
    projCode?: string;
    projName?: string;
}

interface Option {
    label: string;
    value: any;
}

@Component({
    selector: 'app-qad1i030',
    templateUrl: './qad1i030.component.html',
    styleUrls: ['./qad1i030.component.css'],
    providers: [QadConstantsService, ThaiCalendarService]
})
export class Qad1i030Component implements OnInit {
    private menus: SelectItem[];
    private selectedMenu: string;
    private msgs: Message[] = [];
    private searchCondition: SearchCondition = {};
    private searchAdditionCondition: SearchCondition = {};
    private assignQas: any[] = [];
    private notifys: Option[] = [];

    // for QA inspector project
    private selectedIndexAssignQa: number;
    private projResponsibleQaName: string;
    private projAssignQaDate: Date;
    private selectedNotifies: string[] = [];
    private projAssignByQAMName: string;
    private projRemark: string;

    private displaySearchProject: boolean = false;
    private isSelectedProject: boolean = false;
    private projects: any[] = [];
    private selectProject: any;
    private selectProjects: any[] = [];
    private displaySearchSite: boolean = false;
    private isSelectedSite: boolean = false;
    private sites: any[] = [];
    private selectSite: any;
    private selectSites: any[] = [];

    private displaySearchAdditionProject: boolean = false;
    private isSelectedAdditionProject: boolean = false;
    private additionProjects: SelectItem[] = [];
    private selectAdditionProjects: any[] = [];
    private displaySearchAdditionSite: boolean = false;
    private isSelectedAdditionSite: boolean = false;
    private additionSites: any[] = [];
    private selectAdditionSite: any;
    private selectAdditionSites: any[] = [];

    private findHeaderName: string;
    private optionSearchEmp: number;
    private displaySearchEmp: boolean = false;
    private emps: any[] = [];
    private selectEmp: any;
    private selectEmps: any[] = [];

    constructor(private http: Http,
        private router: Router,
        private qadConstant: QadConstantsService,
        private locale: ThaiCalendarService) {
        this.menus = [];
        this.menus.push({ label: 'Assign QA', value: '/qad/QAD1I030' });
        this.menus.push({ label: 'QA Schedule and Plan', value: '/qad/QAD1Q010' });
    }

    ngOnInit() {
        this.selectedMenu = this.router.url;
        this.searchCondition.projType = 1;
        this.searchAdditionCondition.projType = 1;
        this.notifys = [
            { label: 'ADMS', value: 'ADMS' },
            { label: 'Email', value: 'Email' }
        ];
        this.selectedNotifies = ['Email']; // default value when open page
        this.projAssignByQAMName = 'ประไพลักษณ์ วรยศโกวิท';// Todo when connect to service find qam have one or else
    }

    nav() {
        this.router.navigate([this.selectedMenu]);
    }

    
    showDialogSearchProject() {
        this.searchProject();
        this.displaySearchProject = true;
    }

    searchProject() {
        this.selectProjects = [];
        if (this.isSelectedSite) {
            this.isSelectedProject = false;
            this.searchCondition.projCode = '';
            this.searchCondition.projName = '';
            this.selectProject = null;
            let site = this.searchCondition.projSiteCode;
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    let projects = projs.filter((proj) => proj.projSiteCode === site);
                    this.projects = projects.map((proj) => {
                        return { label: proj.projCode, value: proj };
                    })
                    this.projects.unshift({ label: 'เลือกรหัสโครงการ', value: null });
                });
        } else {
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    this.projects = projs.map((proj) => {
                        return { label: proj.projCode, value: proj };
                    });
                    this.projects.unshift({ label: 'เลือกรหัสโครงการ', value: null });
                });
        }
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
            if (!this.isSelectedSite) {
                let projSiteCode = this.selectProject.projSiteCode;
                this.http.get('app/qad/resources/data/sitesMockData.json')
                    .map(res => res.json().data)
                    .subscribe((sites) => {
                        this.selectSites = sites.filter((site) => site.siteCode === projSiteCode);
                        if (this.selectSites.length === 1) {
                            this.selectSite = this.selectSites[0];
                            this.searchCondition.projSiteCode = this.selectSites[0].siteCode;
                            this.searchCondition.projSiteName = this.selectSites[0].siteName;
                            this.isSelectedSite = true;
                        }
                    });
            }

            this.search();
            this.displaySearchProject = false;
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

    showDialogSearchSite() {
        this.searchSite();
        this.displaySearchSite = true;
    }

    searchSite() {
        this.http.get('app/qad/resources/data/sitesMockData.json')
            .map(res => res.json().data)
            .subscribe((sites) => {
                this.sites = sites.map((site) => {
                    return { label: site.siteCode, value: site };
                });
                this.sites.unshift({ label: 'เลือกรหัสหน่วยงาน', value: null });
            });
    }

    onChangeSelectSite() {
        this.selectSites = [];
        if (this.selectSite !== undefined && this.selectSite !== null) {
            this.selectSites.push(this.selectSite);
        }
    }

    okSelectSite() {
        if (this.selectSite !== undefined && this.selectSite !== null) {
            this.searchCondition.projSiteCode = this.selectSite.siteCode;
            this.searchCondition.projSiteName = this.selectSite.siteCode;
            this.isSelectedSite = true;
            this.showDialogSearchProject();
            this.displaySearchSite = false;
        }
    }

    cancelSelectSite() {
        this.displaySearchSite = false;
    }

    onChangeTextSite() {
        this.isSelectedSite = false;
        this.searchCondition.projSiteName = '';
        this.selectSite = null;
        this.selectSites = [];
    }

    showDialogSearchAdditionProject() {
        this.searchAdditionProject();
        this.displaySearchAdditionProject = true;
    }

    searchAdditionProject() {
        this.searchAdditionCondition.projName = '';
        this.selectAdditionProjects = [];
        this.isSelectedAdditionProject = false;
        if (this.isSelectedAdditionSite) {
            let site = this.searchAdditionCondition.projSiteCode;
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    let projects = projs.filter((proj) => proj.projSiteCode === site);
                    this.additionProjects = projects.map((proj) => {
                        return { label: proj.projCode, value: proj };
                    })
                });
        } else {
            this.http.get('app/qad/resources/data/projectsMockData.json')
                .map(res => res.json().data)
                .subscribe((projs) => {
                    this.additionProjects = projs.map((proj) => {
                        return { label: proj.projCode, value: proj };
                    });
                });
        }
    }

    okSelectAdditionProject() {
        if (this.selectAdditionProjects.length > 0) {
            let allProjCode = '';
            for (let i = 0; i < this.selectAdditionProjects.length; i++) {
                if (i === 0) {
                    allProjCode = this.selectAdditionProjects[i].projCode;
                } else {
                    allProjCode = allProjCode + ',' + this.selectAdditionProjects[i].projCode;
                }
            }

            this.searchAdditionCondition.projCode = allProjCode;
            this.isSelectedAdditionProject = true;
        } else {
            this.searchAdditionCondition.projCode = '';
            this.isSelectedAdditionProject = false;
        }

        this.displaySearchAdditionProject = false;
    }

    cancelSelectAdditionProject() {
        this.displaySearchAdditionProject = false;
    }

    onChangeTextAdditionProject() {
        this.isSelectedAdditionProject = false;
    }

    showDialogSearchAdditionSite() {
        this.searchAdditionSite();
        this.displaySearchAdditionSite = true;
    }

    searchAdditionSite() {
        this.http.get('app/qad/resources/data/sitesMockData.json')
            .map(res => res.json().data)
            .subscribe((sites) => {
                this.additionSites = sites.map((site) => {
                    return { label: site.siteCode, value: site };
                });
                this.additionSites.unshift({ label: 'เลือกรหัสหน่วยงาน', value: null });
            });
    }

    onChangeSelectAdditionSite() {
        this.selectAdditionSites = [];
        if (this.selectAdditionSite !== undefined && this.selectAdditionSite !== null) {
            this.selectAdditionSites.push(this.selectAdditionSite);
        }
    }

    okSelectAdditionSite() {
        if (this.selectAdditionSite !== undefined && this.selectAdditionSite !== null) {
            this.searchAdditionCondition.projSiteCode = this.selectAdditionSite.siteCode;
            this.searchAdditionCondition.projSiteName = this.selectAdditionSite.siteCode;
            this.isSelectedAdditionSite = true;
            this.isSelectedAdditionProject = false;
            this.searchAdditionCondition.projCode = '';
            this.selectAdditionProjects = [];
            this.showDialogSearchAdditionProject();
            this.displaySearchAdditionSite = false;
        }
    }

    cancelSelectAdditionSite() {
        this.displaySearchAdditionSite = false;
    }

    onChangeTextAdditionSite() {
        this.isSelectedAdditionSite = false;
        this.searchAdditionCondition.projSiteName = '';
        this.selectAdditionSite = null;
        this.selectAdditionSites = [];
    }

    showDialogSearchEmp(option: number) {
        this.optionSearchEmp = option;
        let inCaseDefault: boolean = false;
        switch (this.optionSearchEmp) {
            case 1:
                // Project Manager
                this.findHeaderName = 'Project Manager';
                break;
            case 2:
                // Senior Manager
                this.findHeaderName = 'Senior Manager';
                break;
            case 3:
                // QA Manager
                this.findHeaderName = 'QA Manager';
                break;
            case 4:
                // Create By (QA)
                this.findHeaderName = 'Create By (QA)';
                break;
            case 5:
            case 6:
                // QA ผู้รับผิดชอบ
                this.findHeaderName = 'QA ผู้รับผิดชอบ';
                break;
            default:
                inCaseDefault = true;
        }

        if (!inCaseDefault) {
            this.searchEmp();
        }

        this.displaySearchEmp = (inCaseDefault) ? false : true;
    }

    searchEmp() {
        this.selectEmps = [];
        let emps;
        switch (this.optionSearchEmp) {
            case 1:
                emps = [
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
                this.emps = emps.map((emp) => {
                    return { label: emp.thainame, value: emp };
                });
                this.emps.unshift({ label: 'เลือกชื่อ', value: null });
                break;
            case 2:
                // Senior Manager
                emps = [
                    { thainame: 'นางพัชรวรรณ ทันอินทรอาจ', engname: 'PATCHARAWAN TANINTARAARJ' },
                    { thainame: 'นางวันเพ็ญ กาญจนประพิณ', engname: 'WANPEN KANCHANAPRAPIN' },
                    { thainame: 'นายกฤษฎา รักษ์งาน', engname: 'KRISADA RUKNGAN' }
                ];
                this.emps = emps.map((emp) => {
                    return { label: emp.thainame, value: emp };
                });
                this.emps.unshift({ label: 'เลือกชื่อ', value: null });
                break;
            case 3:
                // QA Manager
                emps = [
                    { thainame: 'ประไพลักษณ์ วรยศโกวิท', engname: 'PRAPAILUK WORRAYOTKOVIT' }
                ];
                this.emps = emps.map((emp) => {
                    return { label: emp.thainame, value: emp };
                });
                this.emps.unshift({ label: 'เลือกชื่อ', value: null });
                break;
            case 4:
                // Create By (QA)
                emps = [
                    { thainame: 'ณัฐรี เตชะทวีกุล', engname: 'NATTAREE TECHATAWEEKUL' },
                    { thainame: 'ศิริรุ้ง รัศมีวงศ์พร', engname: 'SIRIROONG RUSSAMEEWONGPORN' }
                ];
                this.emps = emps.map((emp) => {
                    return { label: emp.thainame, value: emp };
                });
                this.emps.unshift({ label: 'เลือกชื่อ', value: null });
                break;
            case 5:
            case 6:
                // QA ผู้รับผิดชอบ
                emps = [
                    { thainame: 'ณัฐรี เตชะทวีกุล', engname: 'NATTAREE TECHATAWEEKUL' },
                    { thainame: 'ศิริรุ้ง รัศมีวงศ์พร', engname: 'SIRIROONG RUSSAMEEWONGPORN' }
                ];
                this.emps = emps.map((emp) => {
                    return { label: emp.thainame, value: emp };
                });
                this.emps.unshift({ label: 'เลือกชื่อ', value: null });
                break;
            default:
        }
    }

    onChangeSelectEmp() {
        this.selectEmps = [];
        if (this.selectEmp !== undefined && this.selectEmp !== null) {
            this.selectEmps.push(this.selectEmp);
        }
    }

    okSelectEmp() {
        if (this.selectEmp !== undefined && this.selectEmp !== null) {
            switch (this.optionSearchEmp) {
                case 1:
                    // Project Manager
                    this.searchCondition.projManager = this.selectEmp.thainame;
                    break;
                // case 2:
                //     Senior Manager
                //     this.searchCondition.projSeniorManager = this.selectEmp.thainame;
                //     break;
                case 3:
                    //QA Manager
                    this.projAssignByQAMName = this.selectEmp.thainame;
                    break;
                // case 4:
                //     Create By (QA)
                //     this.searchCondition.projCreateByQA = this.selectEmp.thainame;
                //     break;
                case 5:
                    // QA ผู้รับผิดชอบ
                    this.projResponsibleQaName = this.selectEmp.thainame;
                    break;
                case 6:
                    // QA ผู้รับผิดชอบ ในช่องตัวเลือกการค้นหา
                    this.searchAdditionCondition.projResponsibleQaName = this.selectEmp.thainame;
                    break;
                default:
            }

            this.displaySearchEmp = false;
        }
    }

    cancelSelectEmp() {
        this.displaySearchEmp = false;
    }

    search() {
        if (this.isSelectedProject) {
            this.http.get('app/qad/resources/data/assignQasMockData.json')
                .map(res => res.json().data)
                .subscribe((assignQas: any[]) => {
                    let projCode = this.searchCondition.projCode;
                    assignQas = assignQas.filter((assignQa) => assignQa.projCode === projCode);

                    let projReceivePlanDate: number = 0;
                    if (this.searchCondition.projReceivePlanDate !== undefined) {
                        projReceivePlanDate = +this.searchCondition.projReceivePlanDate;
                        assignQas = assignQas.filter((assignQa) => assignQa.receivePlanDate === projReceivePlanDate);
                    }

                    this.assignQas = assignQas;
                    for (let i = 0; i < this.assignQas.length; i++) {
                        this.assignQas[i].select = false;
                        this.assignQas[i].orderSeq = i + 1;
                        if (this.assignQas[i].receivePlanDate === null) {
                            this.assignQas[i].showReceivePlanDate = '';
                        } else {
                            let receivePlanDate = new Date(this.assignQas[i].receivePlanDate);
                            if (receivePlanDate.toString() !== 'Invalid Date') {
                                this.assignQas[i].showReceivePlanDate = receivePlanDate.getDate() + '/' + (receivePlanDate.getMonth() + 1) + '/' + receivePlanDate.getFullYear();
                            } else {
                                this.assignQas[i].showReceivePlanDate = '';
                            }
                        }

                        if (this.assignQas[i].assignQaDate === null) {
                            this.assignQas[i].showAssignQaDate = '';
                        } else {
                            let assignQaDate = new Date(this.assignQas[i].assignQaDate);
                            if (assignQaDate.toString() !== 'Invalid Date') {
                                this.assignQas[i].showAssignQaDate = assignQaDate.getDate() + '/' + (assignQaDate.getMonth() + 1) + '/' + assignQaDate.getFullYear();
                            } else {
                                this.assignQas[i].showAssignQaDate = '';
                            }
                        }
                    }
                });
        }
    }

    searchAddition() {
        if (this.isSelectedAdditionProject) {
            let findAssignQas: any[] = [];
            this.http.get('app/qad/resources/data/assignQasMockData.json')
                .map(res => res.json().data)
                .subscribe((assignQas: any[]) => {
                    let orderSeq = 1;
                    for (let i = 0; i < this.selectAdditionProjects.length; i++) {
                        let projCode = this.selectAdditionProjects[i].projCode;
                        let find = assignQas.filter((assignQa) => assignQa.projCode === projCode);
                        if (find.length > 0) {
                            find.map((v) => {
                                v.select = false;
                                v.orderSeq = orderSeq++;
                                if (v.receivePlanDate === null) {
                                    v.showReceivePlanDate = '';
                                } else {
                                    let receivePlanDate = new Date(v.receivePlanDate);
                                    if (receivePlanDate.toString() !== 'Invalid Date') {
                                        v.showReceivePlanDate = receivePlanDate.getDate() + '/' + (receivePlanDate.getMonth() + 1) + '/' + receivePlanDate.getFullYear();
                                    } else {
                                        v.showReceivePlanDate = '';
                                    }
                                }

                                if (v.assignQaDate === null) {
                                    v.showAssignQaDate = '';
                                } else {
                                    let assignQaDate = new Date(v.assignQaDate);
                                    if (assignQaDate.toString() !== 'Invalid Date') {
                                        v.showAssignQaDate = assignQaDate.getDate() + '/' + (assignQaDate.getMonth() + 1) + '/' + assignQaDate.getFullYear();
                                    } else {
                                        v.showAssignQaDate = '';
                                    }
                                }

                                findAssignQas.push(v);
                            });
                        }
                    }
                });

            this.assignQas = findAssignQas;
        }
    }

    onChangeSelectAssignQa(assignQa: any) {
        let index = -1;
        index = this.assignQas.indexOf(assignQa);

        for (let i = 0; i < this.assignQas.length; i++) {
            if (i !== index) {
                this.assignQas[i].select = false;
            }
        }

        if (this.assignQas[index].select === true) {
            this.selectedIndexAssignQa = index;
            this.projResponsibleQaName = this.assignQas[index].responsibleQaName;
            this.projAssignQaDate = new Date(this.assignQas[index].assignQaDate);
            let noti: string[] = this.assignQas[index].selectedNotifies;
            if (noti !== undefined) {
                this.selectedNotifies = noti.slice();
            } else {
                this.selectedNotifies = [];
            }

            this.projAssignByQAMName = this.assignQas[index].assignByQAMName;
            this.projRemark = this.assignQas[index].remark;
        } else {
            this.cancelAssignQa();
        }
    }

    saveAssignQa() {
        let alertMessage = '';
        if (this.searchCondition.projCode === undefined || this.searchCondition.projCode.trim() === '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ค้นหา "Project"';
        }

        if (this.searchCondition.projSiteCode === undefined || this.searchCondition.projSiteCode.trim() == '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ค้นหา "Site"';
        }

        if (this.projResponsibleQaName === undefined || this.projResponsibleQaName.trim() === '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ระบุ "QA ผู้รับผิดชอบ"';
        }

        if (this.projAssignQaDate === null) {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ระบุ "วันที่ Assign QA"';
        }

        let noti = this.selectedNotifies;
        if (noti.length === 0) {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ระบุ "แจ้ง QA ผู้รับผิดชอบ"';
        }

        if (this.projAssignByQAMName === undefined || this.projAssignByQAMName.trim() === '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? ', \n' : '') + 'ไม่ได้ระบุ "Assign โดย (QA Manager)"';
        }

        if (alertMessage === '') {
            if (this.selectedIndexAssignQa !== undefined && this.selectedIndexAssignQa !== null) {
                this.assignQas[this.selectedIndexAssignQa].responsibleQaName = this.projResponsibleQaName;
                this.assignQas[this.selectedIndexAssignQa].assignQaDate = this.projAssignQaDate;
                let assignQaDate = new Date(this.assignQas[this.selectedIndexAssignQa].assignQaDate);
                this.assignQas[this.selectedIndexAssignQa].showAssignQaDate = assignQaDate.getDate() + '/' + (assignQaDate.getMonth() + 1) + '/' + assignQaDate.getFullYear();

                this.assignQas[this.selectedIndexAssignQa].selectedNotifies = noti.slice();
                this.assignQas[this.selectedIndexAssignQa].assignByQAMName = this.projAssignByQAMName;
                this.assignQas[this.selectedIndexAssignQa].remark = this.projRemark
            } else {
                // Add new
                let newAssignQa: any = {};
                let orderSeq = 1;
                if (this.assignQas.length > 0) {
                    orderSeq = +this.assignQas[this.assignQas.length - 1].orderSeq;
                    orderSeq++;
                }

                newAssignQa.orderSeq = orderSeq.toString();
                newAssignQa.projCode = this.searchCondition.projCode;
                newAssignQa.projName = this.searchCondition.projName;
                newAssignQa.responsibleQaName = this.projResponsibleQaName;
                newAssignQa.assignQaDate = this.projAssignQaDate;
                let assignQaDate = new Date(newAssignQa.assignQaDate);
                newAssignQa.showAssignQaDate = assignQaDate.getDate() + '/' + (assignQaDate.getMonth() + 1) + '/' + assignQaDate.getFullYear();

                newAssignQa.selectedNotifies = noti.slice();
                newAssignQa.assignByQAMName = this.projAssignByQAMName;
                newAssignQa.status = 'กำหนด QA ผู้รับผิดชอบแล้ว';
                newAssignQa.remark = this.projRemark

                this.assignQas.push(newAssignQa);
            }
        } else {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: 'แจ้งเตือน', detail: alertMessage });
        }
    }

    cancelAssignQa() {
        if (this.selectedIndexAssignQa !== undefined) {
            this.assignQas[this.selectedIndexAssignQa].select = false;
        }

        this.selectedIndexAssignQa = undefined;
        this.projResponsibleQaName = '';
        this.projAssignQaDate = null;
        this.selectedNotifies = ['Email'];
        this.projRemark = '';
    }

    deleteRowAssignQa(assignQa: any) {
        let index = -1;
        index = this.assignQas.indexOf(assignQa);
        if (this.assignQas[index].status === 'รับทราบและดำเนินการ') {
            alert('ไม่สามารถลบได้');
        } else {
            let orderSeq = +this.assignQas[index].orderSeq;

            this.assignQas.splice(index, 1); // Delete

            // Reorder
            for (let i = index; i < this.assignQas.length; i++) {
                this.assignQas[i].orderSeq = orderSeq;
                orderSeq++;
            }
        }
    }
}
