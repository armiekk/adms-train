import { Component, OnInit } from '@angular/core';
import { Pri1i040Service, ProjCondition } from '../../services/pri1i040/pri1i040.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i040',
  templateUrl: './pri1i040.component.html',
  styleUrls: ['./pri1i040.component.css'],
  providers: [Pri1i040Service]
})
export class Pri1i040Component implements OnInit {

  private projConditionList: ProjCondition[] = [];
  private selectedProjCondition: ProjCondition[] = [];

  constructor(private projConditionService: Pri1i040Service, private state: StateService) { }

  ngOnInit() {
    this.projConditionService.getProjConditionList(this.state.projCode)
          .subscribe((projConditionList) => this.projConditionList = projConditionList);
  }

  addProjConditionRowData(){
    let dummyRow: ProjCondition = { edit: false };
    this.projConditionList = [  dummyRow, ...this.projConditionList];
  }

  editProjConditionRow(index: number){
    this.projConditionList[index].edit = true;
  }

  saveEditedProjConditionRow(projCondition: any, index: number){
    this.projConditionList.splice(index, projCondition);
    this.projConditionList[index].edit = false;
  }

  cancelEditedProjConditionRow(index: number){
    this.projConditionList[index].edit = false;
  }

}
