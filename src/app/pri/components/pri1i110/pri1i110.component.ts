import { Component, OnInit } from '@angular/core';
import { Pri1i110Service, ProjOther } from '../../services/pri1i110/pri1i110.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i110',
  templateUrl: './pri1i110.component.html',
  styleUrls: ['./pri1i110.component.css'],
  providers: [Pri1i110Service]
})
export class Pri1i110Component implements OnInit {

  private projOtherList: ProjOther[] = [];
  private selectedProjOther: ProjOther[] = [];

  constructor(
    private projOtherService: Pri1i110Service, 
    private state: StateService,
    ) { }

  ngOnInit() {
    this.projOtherService.getProjOtherList(this.state.projCode)
          .subscribe((projOtherList) => this.projOtherList = projOtherList);
  }

  addProjOtherRowData(){
    let dummyRow: ProjOther = { edit: false };
    this.projOtherList = [  dummyRow, ...this.projOtherList];
  }

  editProjOtherRow(index: number){
    this.projOtherList[index].edit = true;
  }

  saveEditedProjOtherRow(projOther: any, index: number){
    this.projOtherList.splice(index, projOther);
    this.projOtherList[index].edit = false;
  }

  cancelEditedProjOtherRow(index: number){
    this.projOtherList[index].edit = false;
  }

}
