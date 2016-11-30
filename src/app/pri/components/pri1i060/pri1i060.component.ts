import { Component, OnInit } from '@angular/core';
import { Pri1i060Service, ProjLimit } from '../../services/pri1i060/pri1i060.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i060',
  templateUrl: './pri1i060.component.html',
  styleUrls: ['./pri1i060.component.css'],
  providers: [Pri1i060Service]
})
export class Pri1i060Component implements OnInit {

  private projLimitList: ProjLimit[] = [];
  private selectedProjLimit: ProjLimit[] = [];

  constructor(private projLimitService: Pri1i060Service, private state: StateService) { }

  ngOnInit() {
    this.projLimitService.getProjLimitList(this.state.projCode)
          .subscribe((projLimitList) => this.projLimitList = projLimitList);
  }

  addProjLimitRowData(){
    let dummyRow: ProjLimit = { edit: false };
    this.projLimitList = [  dummyRow, ...this.projLimitList];
  }

  editProjLimitRow(index: number){
    this.projLimitList[index].edit = true;
  }

  saveEditedProjLimitRow(projLimit: any, index: number){
    this.projLimitList.splice(index, projLimit);
    this.projLimitList[index].edit = false;
  }

  cancelEditedProjLimitRow(index: number){
    this.projLimitList[index].edit = false;
  }

}
