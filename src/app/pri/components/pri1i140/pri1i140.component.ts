import { Component, OnInit } from '@angular/core';
// import { Pri1i140Service, ProjRiskAnalyst } from '../../services/pri1i140/pri1i140.service';
import { StateService } from '../../../shared/services/state/state.service';
import { PriConstantsService } from '../../constants';

@Component({
  selector: 'app-pri1i140',
  templateUrl: './pri1i140.component.html',
  styleUrls: ['./pri1i140.component.css'],
  // providers: [Pri1i140Service]
})
export class Pri1i140Component implements OnInit {

  // private projRiskAnalystList: ProjRiskAnalyst[] = [];
  // private selectedProjRiskAnalyst: ProjRiskAnalyst[] = [];

  private projRiskAnalystList: any[] = [];
  private selectedProjRiskAnalyst: any[] = [];

  constructor(
    // private projRiskAnalystService: Pri1i140Service, 
    private state: StateService,
    private constant: PriConstantsService
    ) { }

  ngOnInit() {
    // this.projRiskAnalystService.getProjRiskAnalystList(this.state.projCode)
    //       .subscribe((projRiskAnalystList) => this.projRiskAnalystList = projRiskAnalystList);
  }

  addProjRiskAnalystRowData(){
    // let dummyRow: ProjRiskAnalyst = { edit: false };
    // this.projRiskAnalystList = [  dummyRow, ...this.projRiskAnalystList];
  }

  editProjRiskAnalystRow(index: number){
    this.projRiskAnalystList[index].edit = true;
  }

  saveEditedProjRiskAnalystRow(projRiskAnalyst: any, index: number){
    this.projRiskAnalystList.splice(index, projRiskAnalyst);
    this.projRiskAnalystList[index].edit = false;
  }

  cancelEditedProjRiskAnalystRow(index: number){
    this.projRiskAnalystList[index].edit = false;
  }

}
