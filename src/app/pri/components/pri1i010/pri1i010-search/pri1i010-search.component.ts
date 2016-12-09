import { Component, OnInit } from '@angular/core';
import { PriConstantsService } from '../../../constants';
import { StateService } from '../../../../shared/services/state/state.service';
import { Message, SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../../shared/services/user-management/user-management.service';
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
    private pritInfoService: PriInformationService,
    private userManagementService: UserManagementService, 
  ) {
  }

  ngOnInit() {
    this.userManagementService.changeDropdownVisibility();
  }

  searchPriInformation() {
    this.pritInfoService.getProjectInformationByCondition(this.searchCondition)
      .subscribe((response: ProjectInformationInfoBean[]) => this.pritInformationList = response);
  }


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
