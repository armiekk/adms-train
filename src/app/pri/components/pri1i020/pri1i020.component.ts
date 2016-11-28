import { Component, OnInit } from '@angular/core';
import { Pri1i020Service, ProjScope } from '../../services/pri1i020/pri1i020.service';
import { StateService } from '../../../shared/services/state/state.service';


@Component({
  selector: 'app-pri1i020',
  templateUrl: './pri1i020.component.html',
  styleUrls: ['./pri1i020.component.css'],
  providers: [Pri1i020Service]
})
export class Pri1i020Component implements OnInit {

  private projScopeList: ProjScope[] = [];
  private selectedProjScope: ProjScope[] = [];

  constructor(private priScopeService: Pri1i020Service, private state: StateService) { }

  ngOnInit() {
    this.priScopeService.getPritScopeList(this.state.projCode)
          .subscribe((projScopeList) => this.projScopeList = projScopeList);
  }

  addRowData(){
    let dummyRow: ProjScope = { edit: false };
    this.projScopeList = [  dummyRow, ...this.projScopeList];
  }

  editRow(index: number){
    this.projScopeList[index].edit = true;
  }

  saveEditedRow(projScope: any, index: number){
    this.projScopeList.splice(index, projScope);
    this.projScopeList[index].edit = false;
  }

  cancelEditedRow(index: number){
    this.projScopeList[index].edit = false;
  }

}
