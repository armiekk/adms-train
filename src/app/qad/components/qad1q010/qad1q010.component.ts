import { Component, OnInit } from '@angular/core';

import { PritInformation } from '../../api/prit-information/model/PritInformation';
import { EmptProjectManager } from '../../api/empt-project-manager/model/EmptProjectManager';

import { PritInformationApi } from '../../api/prit-information/api/PritInformationApi';
import { EmptProjectManagerApi } from '../../api/empt-project-manager/api/EmptProjectManagerApi';

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
}

interface SearchProjCode {
    projCode?: string;
    projName?: string;
}

interface Emp {
    thainame?: string;
    engname?: string;
}

@Component({
    selector: 'app-qad1q010',
    templateUrl: './qad1q010.component.html',
    styleUrls: ['./qad1q010.component.css'],
    providers: [ThaiCalendarService, PritInformationApi, EmptProjectManagerApi]
})
export class Qad1q010Component implements OnInit {
    searchCondition: SearchCondition;

    private projSiteCode: string;
    private projManager: string;
    private projSeniorManager: string;
    private projQAManager: string;
    private projCreateByQA: string;

    constructor(private locale: ThaiCalendarService,
        private pritInformationService: PritInformationApi,
        private emptProjectManagerService: EmptProjectManagerApi) { }

    ngOnInit() {
        this.searchCondition = {
            projCode: ''
        };
        this.searchProjCode = {};
    }

    private searchProjCode: SearchProjCode;
    private selectedProj: PritInformation;
    private resultSearchProjects: PritInformation[];
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
        this.selectedProj = null;
        this.displaySearchProjCode = false;
    }

    searchByProjCode() {
        this.pritInformationService.defaultHeaders.append('Content-Type', 'application/json');
        this.pritInformationService.defaultHeaders.append('Accept', 'application/json');
        if (this.searchProjCode !== undefined && this.searchProjCode.projCode !== undefined && this.searchProjCode.projCode.trim() !== '') {
            this.pritInformationService.pritInfomationFindByProjCode(this.searchProjCode.projCode.trim()).subscribe((response: PritInformation[]) => this.resultSearchProjects = response);
        } else {
            this.pritInformationService.pritInformationFind().subscribe((response: PritInformation[]) => this.resultSearchProjects = response);
        }
    }

    clearTextProjName() {
        if (this.searchCondition.projCode !== undefined && this.searchCondition.projCode.trim() === '') {
            this.searchCondition.projName = ''
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
                //Project Manager
                this.searchCondition.projManager = this.selectedEmp.thainame;
                break;
            case 2:
                //Senior Manager
                this.searchCondition.projSeniorManager = this.selectedEmp.thainame;
                break;
            case 3:
                //QA Manager
                this.searchCondition.projQAManager = this.selectedEmp.thainame;
                break;
            case 4:
                //Create By (QA)
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
}
