import { Component, OnInit } from '@angular/core';
// import { PritInformation } from '../../../api/pri-information';
import { ApipriinformationApi } from '../../../api/pri1i010/api/ApipriinformationApi';
import { PritInformationApi } from '../../../../shared/api/mockup-prit-information-service/api/PritInformationApi';
import { PritInformation } from '../../../../shared/api/mockup-prit-information-service/model/PritInformation';
import { PriConstantsService } from '../../../constants';
import { StateService } from '../../../../shared/services/state/state.service';
import { Message, SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { SearchCondition } from '../../../services/pri1i010/pri-information.service';



@Component({
  selector: 'app-pri1i010-search',
  templateUrl: './pri1i010-search.component.html',
  styleUrls: ['./pri1i010-search.component.css'],
  providers: [ApipriinformationApi]
})
export class Pri1i010SearchComponent implements OnInit {

  private seachCondition: SearchCondition = {};
  private pritInformationList: PritInformation[] = [];
  private selectedPriInfo: PritInformation[] = [];
  private msgs: Message[] = [];
  private projectListItem: SelectItem[] = [];
  private selectedProject: PritInformation;
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

  searchPriInformation() {
    this.pritInfoService.pritInformationFind()
      .subscribe((response: PritInformation[]) => this.pritInformationList = response);
  }

  searchProject(){
    this.isShowSearchProject = !this.isShowSearchProject;
    if(this.projectListItem.length === 0){
      this.pritInfoService.pritInformationFind()
      .subscribe((response: PritInformation[]) => {
        this.projectListItem = response.map((pritInformation: PritInformation) => {
          return {label: pritInformation.projCode, value: pritInformation };
        });
      });
    }
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

  onRowSelect(event: { data: PritInformation }){
    this.state.projCode = event.data.projCode;
    this.state.mode = 'EDIT';
    this.router.navigate(['pri/Pri1i010/edit']);
  }

  goToAddView() {
    this.state.mode = 'ADD';
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
