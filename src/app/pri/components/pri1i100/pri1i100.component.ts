import { Component, OnInit } from '@angular/core';
import { Pri1i100Service, ProjTrain } from '../../services/pri1i100/pri1i100.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i100',
  templateUrl: './pri1i100.component.html',
  styleUrls: ['./pri1i100.component.css'],
  providers: [Pri1i100Service]
})
export class Pri1i100Component implements OnInit {

  private projTrainList: ProjTrain[] = [];
  private selectedProjTrain: ProjTrain[] = [];

  constructor(
    private projTrainService: Pri1i100Service, 
    private state: StateService,
    ) { }

  ngOnInit() {
    this.projTrainService.getProjTrainList(this.state.projCode)
          .subscribe((projTrainList) => this.projTrainList = projTrainList);
  }

  addProjTrainRowData(){
    let dummyRow: ProjTrain = { edit: false };
    this.projTrainList = [  dummyRow, ...this.projTrainList];
  }

  editProjTrainRow(index: number){
    this.projTrainList[index].edit = true;
  }

  saveEditedProjTrainRow(projTrain: any, index: number){
    this.projTrainList.splice(index, projTrain);
    this.projTrainList[index].edit = false;
  }

  cancelEditedProjTrainRow(index: number){
    this.projTrainList[index].edit = false;
  }

}
