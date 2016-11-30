import { Component, OnInit } from '@angular/core';
import { Pri1i070Service, ProjMonitor } from '../../services/pri1i070/pri1i070.service';
import { StateService } from '../../../shared/services/state/state.service';
import { PriConstantsService } from '../../constants';

@Component({
  selector: 'app-pri1i070',
  templateUrl: './pri1i070.component.html',
  styleUrls: ['./pri1i070.component.css'],
  providers: [Pri1i070Service]
})
export class Pri1i070Component implements OnInit {

  private projMonitorList: ProjMonitor[] = [];
  private selectedProjMonitor: ProjMonitor[] = [];

  constructor(
    private projMonitorService: Pri1i070Service, 
    private state: StateService,
    private constant: PriConstantsService
    ) { }

  ngOnInit() {
    this.projMonitorService.getProjMonitorList(this.state.projCode)
          .subscribe((projMonitorList) => this.projMonitorList = projMonitorList);
  }

  addProjMonitorRowData(){
    let dummyRow: ProjMonitor = { edit: false };
    this.projMonitorList = [  dummyRow, ...this.projMonitorList];
  }

  editProjMonitorRow(index: number){
    this.projMonitorList[index].edit = true;
  }

  saveEditedProjMonitorRow(projMonitor: any, index: number){
    this.projMonitorList.splice(index, projMonitor);
    this.projMonitorList[index].edit = false;
  }

  cancelEditedProjMonitorRow(index: number){
    this.projMonitorList[index].edit = false;
  }

}
