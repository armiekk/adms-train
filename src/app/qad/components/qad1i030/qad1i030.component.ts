import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ThaiCalendarService } from '../../../shared/services/thai-calendar/thai-calendar.service';

interface SearchCondition {
    projCode?: string;
    projName?: string;
    projSiteCode?: string;
    projSiteName?: string;
    projManager?: string;
    projReceivePlanDate?: Date;
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
    selector: 'app-qad1i030',
    templateUrl: './qad1i030.component.html',
    styleUrls: ['./qad1i030.component.css']
})
export class Qad1i030Component implements OnInit {
    private searchCondition: SearchCondition;
    private assignQas: Array<any> = [];
    private notifys: Option[] = [];

    //for QA inspector project
    private selectedIndexAssignQa: number;
    private projResponsibleQaName: string;
    private projAssignQaDate: Date;
    private selectedNotifies: string[] = [];
    private projAssignByQAMName: string;
    private projRemark: string;

    constructor(private locale: ThaiCalendarService,
        private http: Http) { }

    ngOnInit() {
        this.searchCondition = {};
        this.searchProjCode = {};
        this.notifys = [
            { label: "ADMS", value: "ADMS" },
            { label: "Email", value: "Email" }
        ];
    }

    private isSelectedSite: boolean = false;
    private searchProjCode: SearchProjCode;
    private selectedProj: any;
    private resultSearchProjects: Array<any> = [];
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

        this.http.get('app/qad/resources/data/assignQasMockData.json')
            .map(res => res.json().data)
            .subscribe((assignQas: Array<any>) => {
                console.log(assignQas);
                console.log(this.searchCondition.projCode);
                this.assignQas = assignQas.filter((assignQa) => {
                    console.log('--' + this.searchCondition.projCode);
                    assignQa.projCode === this.searchCondition.projCode
                });
                // && assignQa.receivePlanDate === +this.searchCondition.projReceivePlanDate
                console.log(this.assignQas);
                for (let i = 0; i < this.assignQas.length; i++) {
                    this.assignQas[i].select = false;
                    this.assignQas[i].orderSeq = i;
                    if (this.assignQas[i].receivePlanDate == null) {
                        this.assignQas[i].showReceivePlanDate = '';
                    } else {
                        let receivePlanDate = new Date(this.assignQas[i].receivePlanDate);
                        if (receivePlanDate.toString() !== 'Invalid Date') {
                            this.assignQas[i].showReceivePlanDate = receivePlanDate.getDate() + '/' + (receivePlanDate.getMonth() + 1) + '/' + receivePlanDate.getFullYear();
                        } else {
                            this.assignQas[i].showReceivePlanDate = '';
                        }
                    }

                    if (this.assignQas[i].assignQaDate == null) {
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
            case 5:
                //QA ผู้รับผิดชอบ
                this.findHeaderName = 'QA ผู้รับผิดชอบ';
                break;
            default:
                inCaseDefault = true;
        }

        this.displaySearchEmp = (inCaseDefault) ? false : true;
    }

    onRowSelectEmp() {
        switch (this.optionSearchEmp) {
            case 1:
                //Project Manager
                this.searchCondition.projManager = this.selectedEmp.thainame;
                break;
            // case 2:
            //     //Senior Manager
            //     this.searchCondition.projSeniorManager = this.selectedEmp.thainame;
            //     break;
            case 3:
                //QA Manager
                this.projAssignByQAMName = this.selectedEmp.thainame;
                break;
            // case 4:
            //     //Create By (QA)
            //     this.searchCondition.projCreateByQA = this.selectedEmp.thainame;
            //     break;
            case 5:
                //QA ผู้รับผิดชอบ
                this.projResponsibleQaName = this.selectedEmp.thainame;
            default:
        }

        this.selectedEmp = undefined;
        this.displaySearchEmp = false;
    }

    searchByEmp() {
        switch (this.optionSearchEmp) {
            case 1:
                //Project Manager
                /*this.emptProjectManagerService.defaultHeaders.append('Content-Type', 'application/json');
                this.emptProjectManagerService.defaultHeaders.append('Accept', 'application/json');
                if (this.searchEmp !== undefined && this.searchEmp.trim() !== '') {
                    this.emptProjectManagerService.emptProjectManagerFindByName(this.searchEmp.trim()).subscribe((response: EmptProjectManager[]) => this.resultSearchEmps = response);
                } else {
                    this.emptProjectManagerService.emptProjectManagerFind().subscribe((response: EmptProjectManager[]) => this.resultSearchEmps = response);
                }*/
                this.resultSearchEmps = [
                    { thainame: "กมลศักดิ์ อิทธิฤกษ์มงคล", engname: "KAMONSAK ITTIRUEGMONGKON" },
                    { thainame: "กำพล หาญนฤชัย", engname: "KAMPON HANNARUECHAI" },
                    { thainame: "เกศมณี คุ้มสาธิต", engname: "KATEMANEE KHOOMSATHIT" },
                    { thainame: "เกียรติชัย สิวลีธนโชค", engname: "KIATICHAI SIWALEETHANACHOK" },
                    { thainame: "จารุมาศ ตีระสหกุล", engname: "CHARUMAS TEERASAHAKUL" },
                    { thainame: "จำนงค์ ขจรเดชะ", engname: "CHAMNONG KHACHONDACHA" },
                    { thainame: "ชนิดา เลาหพิสิฐพาณิชย์", engname: "CHANIDA LAOHAPISITPANICH" },
                    { thainame: "ชินวุธ มณีสาคร", engname: "CHINWUT MANEESACORN" },
                    { thainame: "ชูศักดิ์ ปรมานุรักษ์", engname: "CHUSAK PARAMANURAK" },
                    { thainame: "เดชา ศุกระแพทย์", engname: "DACHA SUKRAPHATTYA" },
                    { thainame: "ทศพร พุทธศุภะ", engname: "THODSAPORN PHUTTASUPA" },
                    { thainame: "ธนา เกษะประกร", engname: "THANA KASAPRAGORN" },
                    { thainame: "ธีรยุทธ์ ฟุ้งเกียรติไพบูลย์", engname: "TEERAYUT FUNGKIATPAIBOOL" },
                    { thainame: "ปภินวิช วสุภัทรภิญโญ", engname: "PAPHINWICH VASUPHATRAPHINYO" },
                    { thainame: "ประไพลักษณ์ วรยศโกวิท", engname: "PRAPAILUK WORRAYOTKOVIT" },
                    { thainame: "พงษ์ศักดิ์ จิรโพธิ์ทอง", engname: "PONGSAK JIRAPHOTHONG" },
                    { thainame: "ไพศาล โชคพิพัฒน์ทวี", engname: "PAISAN CHOKPIPATTAWEE" },
                    { thainame: "มนชิดา โชติเสน", engname: "MONCHIDA CHOTISEN" },
                    { thainame: "วรเมธ วัชระบัณฑูรย์", engname: "WORAMET WATCHARABUNTOON" },
                    { thainame: "วิจิตร ธเนศานุรักษ์", engname: "WIJIT THANESANURAK" },
                    { thainame: "ศราวุฒ ศิริอุดม", engname: "SARAWUT SIRIUDOM" },
                    { thainame: "สมพร นาควงษ์", engname: "SOMPORN NAKWONG" },
                    { thainame: "สมศักดิ์ ชาญชัยรุจิรา", engname: "SOMSAK CHANCHAIRUJIRA" },
                    { thainame: "สุรชัย สถาพรวัฒนายนต์", engname: "SURACHAI SATHAPORNWATTANAYONT" },
                    { thainame: "สุรพล เรืองรอง", engname: "SURAPOL RUENGRONG" },
                    { thainame: "สุรินทร์ อึงนิยม", engname: "SURIN OUNGNIYOM" },
                    { thainame: "สุวรรณ อินยิน", engname: "SUWAN INYIN" },
                    { thainame: "อนุชา โชติวัฒนดิลก", engname: "ANUCHA CHOTWATTANADILOK" },
                    { thainame: "อัมรินทร์ สังขรัตน์", engname: "AMARIN SANGKARAT" },
                    { thainame: "อัศวิน อินทร์แนม", engname: "ADSAWIN INNAEM" }
                ];
                break;
            case 2:
                //Senior Manager
                this.resultSearchEmps = [
                    { thainame: "นางพัชรวรรณ ทันอินทรอาจ", engname: "PATCHARAWAN TANINTARAARJ" },
                    { thainame: "นางวันเพ็ญ กาญจนประพิณ", engname: "WANPEN KANCHANAPRAPIN" },
                    { thainame: "นายกฤษฎา รักษ์งาน", engname: "KRISADA RUKNGAN" }
                ];
                break;
            case 3:
                //QA Manager
                this.resultSearchEmps = [
                    { thainame: "ประไพลักษณ์ วรยศโกวิท", engname: "PRAPAILUK WORRAYOTKOVIT" }
                ];
                break;
            case 4:
                //Create By (QA)
                this.resultSearchEmps = [
                    { thainame: "ณัฐรี เตชะทวีกุล", engname: "NATTAREE TECHATAWEEKUL" },
                    { thainame: "ศิริรุ้ง รัศมีวงศ์พร", engname: "SIRIROONG RUSSAMEEWONGPORN" }
                ];
                break;
            default:
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

        if (this.assignQas[index].select == true) {
            this.selectedIndexAssignQa = index;
            this.projResponsibleQaName = this.assignQas[index].responsibleQaName;
            this.projAssignQaDate = this.assignQas[index].assignQaDate;
            let noti: string[] = this.assignQas[index].selectedNotifies;
            if (noti !== undefined) {
                this.selectedNotifies = noti.slice();
            } else {
                this.selectedNotifies = [];
            }

            this.projAssignByQAMName = this.assignQas[index].assignByQAMName;
            this.projRemark = this.assignQas[index].remark;
        }
    }

    saveAssignQa() {
        let alertMessage = '';
        if (this.searchCondition.projCode == undefined || this.searchCondition.projCode.trim() == '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ค้นหา "Project"';
        }

        if (this.searchCondition.projSiteCode == undefined || this.searchCondition.projSiteCode.trim() == '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ค้นหา "Site"';
        }

        if (this.projResponsibleQaName == undefined || this.projResponsibleQaName.trim() == '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ระบุ "QA ผู้รับผิดชอบ"';
        }

        if (this.projAssignQaDate == null) {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ระบุ "วันที่ Assign QA"';
        }

        let noti = this.selectedNotifies;
        if (noti.length == 0) {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ระบุ "แจ้ง QA ผู้รับผิดชอบ"';
        }

        if (this.projAssignByQAMName == undefined || this.projAssignByQAMName.trim() == '') {
            alertMessage = alertMessage + ((alertMessage !== '') ? '\n' : '') + 'ไม่ได้ระบุ "Assign โดย (QA Manager)"';
        }

        if (alertMessage == '') {
            if (this.selectedIndexAssignQa !== undefined && this.selectedIndexAssignQa !== null) {
                this.assignQas[this.selectedIndexAssignQa].responsibleQaName = this.projResponsibleQaName;
                this.assignQas[this.selectedIndexAssignQa].assignQaDate = this.projAssignQaDate;
                let assignQaDate = new Date(this.assignQas[this.selectedIndexAssignQa].assignQaDate);
                this.assignQas[this.selectedIndexAssignQa].showAssignQaDate = assignQaDate.getDate() + '/' + (assignQaDate.getMonth() + 1) + '/' + assignQaDate.getFullYear();

                this.assignQas[this.selectedIndexAssignQa].selectedNotifies = noti.slice();
                this.assignQas[this.selectedIndexAssignQa].assignByQAMName = this.projAssignByQAMName;
                this.assignQas[this.selectedIndexAssignQa].remark = this.projRemark
            } else {
                //Add new
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
            alert(alertMessage);
        }
    }

    cancelAssignQa() {
        if (this.selectedIndexAssignQa !== undefined) {
            this.assignQas[this.selectedIndexAssignQa].select = false;
        }

        this.projResponsibleQaName = '';
        this.projAssignQaDate = null;
        this.selectedNotifies = [];
        this.projAssignByQAMName = '';
        this.projRemark = '';
    }

    deleteRowAssignQa(assignQa: any) {
        let index = -1;
        index = this.assignQas.indexOf(assignQa);
        if (this.assignQas[index].status == 'รับทราบและดำเนินการ') {
            alert('ไม่สามารถลบได้');
        } else {
            let orderSeq = +this.assignQas[index].orderSeq;

            this.assignQas.splice(index, 1); //Delete

            //Reorder
            for (let i = index; i < this.assignQas.length; i++) {
                this.assignQas[i].orderSeq = orderSeq;
                orderSeq++;
            }
        }
    }
}
