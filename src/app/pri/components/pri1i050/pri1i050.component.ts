import { Component, OnInit } from '@angular/core';
import { Pri1i050Service, ProjDeliver } from '../../services/pri1i050/pri1i050.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i050',
  templateUrl: './pri1i050.component.html',
  styleUrls: ['./pri1i050.component.css'],
  providers: [Pri1i050Service]
})
export class Pri1i050Component implements OnInit {

  private projDeliverList: ProjDeliver[] = [];
  private selectedProjDeliver: ProjDeliver[] = [];

  constructor(private projDeliverService: Pri1i050Service, private state: StateService) { }

  ngOnInit() {
    this.projDeliverService.getProjDeliverList(this.state.projCode)
          .subscribe((projDeliverList) => this.projDeliverList = projDeliverList);
  }

  addProjDeliverRowData(){
    let dummyRow: ProjDeliver = { edit: false };
    this.projDeliverList = [  dummyRow, ...this.projDeliverList];
  }

  editProjDeliverRow(index: number){
    this.projDeliverList[index].edit = true;
  }

  saveEditedProjDeliverRow(projDeliver: any, index: number){
    this.projDeliverList.splice(index, projDeliver);
    this.projDeliverList[index].edit = false;
  }

  cancelEditedProjDeliverRow(index: number){
    this.projDeliverList[index].edit = false;
  }

}
