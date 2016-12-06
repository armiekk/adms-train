import { Component, OnInit } from '@angular/core';
import { PriConstantsService } from '../../../constants';
import { StateService } from '../../../../shared/services/state/state.service';
import { Message, SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { SearchCondition, PriInformationService, PritInformation, ProjectInformationInfoBean } from '../../../services/pri1i010/pri-information.service';



@Component({
  selector: 'app-pri1i010-search',
  templateUrl: './pri1i010-search.component.html',
  styleUrls: ['./pri1i010-search.component.css'],
})
export class Pri1i010SearchComponent implements OnInit {

  private searchCondition: SearchCondition = { start: 0, size: 15 };
  private pritInformationList: ProjectInformationInfoBean[] = [];
  private selectedPriInfo: ProjectInformationInfoBean[] = [];
  private msgs: Message[] = [];
  private projectListItem: SelectItem[] = [];

  constructor(
    private router: Router,
    private state: StateService,
    private constant: PriConstantsService,
    private pritInfoService: PriInformationService
  ) {
  }

  ngOnInit() {
  }

  searchPriInformation() {
    this.pritInfoService.getProjectInformationByCondition(this.searchCondition)
      .subscribe((response: ProjectInformationInfoBean[]) => this.pritInformationList = response);
  }

  // searchProject(){
  //   this.isShowSearchProject = !this.isShowSearchProject;
  //   if(this.projectListItem.length === 0){
  //     this.pritInfoService.getProjectInformationListByCondition()
  //     .subscribe((response: PritInformation[]) => {
  //       this.projectListItem = response.map((pritInformation: PritInformation) => {
  //         return {label: pritInformation.projCode, value: pritInformation };
  //       });
  //     });
  //   }
  // }

  // delete(event) {
  //   event.preventDefault();
  //   if (this.selectedPriInfo[0] === undefined) {
  //     this.msgs.push({ severity: 'warn', summary: 'ลบข้อมูล', detail: 'ไม่พบข้อมูลที่ต้องการลบ' });
  //     return;
  //   } else {
  //     let projRef = this.selectedPriInfo[0].projRef;
  //     this.priService.removePritInformation(projRef)
  //       .subscribe((responseText) => {
  //         if (responseText) {
  //           this.msgs.push({ severity: 'warn', summary: 'ลบข้อมูล', detail: responseText });
  //           this.pritInformationList = this.pritInformationList
  //                                             .filter((priInfo: PritInformation) => priInfo.projRef !== projRef);
  //         } else {
  //           this.msgs.push({ severity: 'error', summary: 'ลบข้อมูล', detail: 'เกิดข้อผิดพลาด' });
  //         }
  //       });
  //   }

  // }

  onRowSelect(event: { data: ProjectInformationInfoBean }){
    this.state.projRef = event.data.projRef;
    this.state.projCode = event.data.projCode;
    this.state.mode = 'EDIT';
    this.router.navigate(['pri/Pri1i010/edit']);
  }

  goToAddView() {
    this.state.mode = 'ADD';
    this.router.navigate(['pri/Pri1i010/add']);
  }

  submitSelectProject(){
    
  }

  cancelSelectProject(){
    
  }

}
