import { Component, OnInit } from '@angular/core';
// import { PritInformation } from '../../../api/pri-information';
import { ApipriinformationApi } from '../../../api/pri-information/api/ApipriinformationApi';
import { PritInformationApi } from '../../../../shared/api/mockup-prit-information-service/api/PritInformationApi';
import { PritInformation } from '../../../../shared/api/mockup-prit-information-service/model/PritInformation';
import { PriConstantsService } from '../../../constants';
import { StateService } from '../../../../shared/services/state/state.service';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

interface SearchCondition {
  projYear?: string;
  projOwnerOrg?: string;
  projCode?: string;
  projType?: number;
  projName?: string;
  projStatus?: Array<number>;
}

const defaultSearchCondition: SearchCondition = {
  projStatus: []
};

@Component({
  selector: 'app-pri1i010-search',
  templateUrl: './pri1i010-search.component.html',
  styleUrls: ['./pri1i010-search.component.css'],
  providers: [ApipriinformationApi]
})
export class Pri1i010SearchComponent implements OnInit {

  private seachCondition: SearchCondition = defaultSearchCondition;
  private pritInformationList: PritInformation[] = [];
  private selectedPriInfo: PritInformation[] = [];
  private msgs: Message[] = [];
  private isShowSearchProject: boolean = false;

  constructor(
    private router: Router,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: ApipriinformationApi,
    private pritInfoService: PritInformationApi
  ) {
  }

  ngOnInit() {
    this.setHeaders();
  }

  search() {
    // this.priService.getAllPritInformations(this.seachCondition)
    //   .subscribe((response: PritInformation[]) => this.pritInformationList = response);
    this.pritInfoService.pritInformationFind()
      .subscribe((response: PritInformation[]) => this.pritInformationList = response);
  }

  delete(event) {
    event.preventDefault();
    if (this.selectedPriInfo[0] === undefined) {
      this.msgs.push({ severity: 'warn', summary: 'ลบข้อมูล', detail: 'ไม่พบข้อมูลที่ต้องการลบ' });
      return;
    } else {
      let projRef = this.selectedPriInfo[0].projRef;
      this.priService.removePritInformation(projRef)
        .subscribe((responseText) => {
          if (responseText) {
            this.msgs.push({ severity: 'warn', summary: 'ลบข้อมูล', detail: responseText });
            this.pritInformationList = this.pritInformationList
                                              .filter((priInfo: PritInformation) => priInfo.projRef !== projRef);
          } else {
            this.msgs.push({ severity: 'error', summary: 'ลบข้อมูล', detail: 'เกิดข้อผิดพลาด' });
          }
        });
    }

  }

  goToAddView() {
    this.state.setState('ADD');
    this.router.navigate(['pri/Pri1i010/add']);
  }

  setHeaders() {
    if (!this.priService.defaultHeaders.has('Authorization')) {
      this.priService.defaultHeaders.append('Content-Type', 'application/json');
      this.priService.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.priService.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
